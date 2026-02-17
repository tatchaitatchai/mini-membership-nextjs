import ky, { HTTPError, type KyInstance } from 'ky'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8085/api/v1'

class ApiClient {
  private client: KyInstance

  constructor() {
    this.client = ky.create({
      prefixUrl: API_BASE_URL,
      timeout: 30000,
      retry: {
        limit: 2,
        methods: ['get', 'post', 'put', 'delete'],
        statusCodes: [408, 429, 500, 502, 503, 504],
      },
      hooks: {
        beforeRequest: [
          (request) => {
            const token = this.getToken()
            if (token) {
              request.headers.set('Authorization', `Bearer ${token}`)
            }
          },
        ],
        afterResponse: [
          async (request, options, response) => {
            if (response.status === 401) {
              this.clearToken()
              if (typeof window !== 'undefined') {
                window.location.href = '/backoffice/login'
              }
            }
            return response
          },
        ],
      },
    })
  }

  private getCookie(name: string): string | null {
    if (typeof window === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
  }

  private setCookie(name: string, value: string, days: number = 7): void {
    if (typeof window === 'undefined') return
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  }

  private deleteCookie(name: string): void {
    if (typeof window === 'undefined') return
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;SameSite=Lax`
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    // Try localStorage first, then cookie
    const localToken = localStorage.getItem('auth_token')
    const cookieToken = this.getCookie('auth_token')
    
    // If both exist but differ, use cookie (more recent)
    if (cookieToken && cookieToken !== localToken) {
      localStorage.setItem('auth_token', cookieToken)
      return cookieToken
    }
    
    return localToken || cookieToken
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
      this.setCookie('auth_token', token, 30) // 30 days
    }
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      this.deleteCookie('auth_token')
      this.deleteCookie('auth_user')
    }
  }
  
  public validateToken(): boolean {
    if (typeof window === 'undefined') return false
    const localToken = localStorage.getItem('auth_token')
    const cookieToken = this.getCookie('auth_token')
    // Token is valid only if both exist
    return !!(localToken && cookieToken)
  }

  async login(email: string, password: string) {
    try {
      const response = await this.client.post('auth/login', {
        json: { email, password },
      }).json<{
        token: string
        staff_user: {
          id: string
          email: string
          branch: string
          created_at: string
          updated_at: string
        }
      }>()

      this.setToken(response.token)
      if (typeof window !== 'undefined') {
        const userJson = JSON.stringify(response.staff_user)
        localStorage.setItem('auth_user', userJson)
        this.setCookie('auth_user', userJson, 30) // 30 days
      }

      return {
        token: response.token,
        user: response.staff_user,
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorData = await error.response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Login failed')
      }
      throw error
    }
  }

  async logout() {
    try {
      await this.client.post('auth/logout').json()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.clearToken()
    }
  }

  async get<T>(endpoint: string, options?: any): Promise<T> {
    return this.client.get(endpoint, options).json<T>()
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.client.post(endpoint, { json: data }).json<T>()
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.client.put(endpoint, { json: data }).json<T>()
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.client.delete(endpoint).json<T>()
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.client.patch(endpoint, { json: data }).json<T>()
  }

  async getMembers(search?: string, page: number = 1, limit: number = 20) {
    const searchParams = new URLSearchParams()
    if (search) searchParams.set('search', search)
    searchParams.set('page', page.toString())
    searchParams.set('limit', limit.toString())
    
    return this.client.get(`members?${searchParams.toString()}`).json<{
      members: Array<{
        id: string
        name: string
        last4: string
        total_points: number
        milestone_score: number
        points_1_0_liter: number
        points_1_5_liter: number
        branch: string
        status: string
        membership_number?: string
        registration_receipt_number: string
        welcome_bonus_claimed: boolean
        registered_by_staff: string
        created_at: string
        updated_at: string
      }>
      total: number
      page: number
      limit: number
    }>()
  }

  async createMember(data: {
    name: string
    last4: string
    branch: string
    registration_receipt_number: string
  }) {
    return this.client.post('members', { json: data }).json<{
      id: string
      name: string
      last4: string
      branch: string
      registration_receipt_number: string
      status: string
      created_at: string
    }>()
  }

  async createTransaction(data: {
    member_id: string
    action: "EARN" | "REDEEM"
    products: Array<{
      product_type: "1_0_LITER" | "1_5_LITER"
      points: number
    }>
    receipt_text: string
  }) {
    return this.client.post('transactions', { json: data }).json<{
      transactions: Array<{
        id: string
        action: string
        product_type: string
        points: number
        created_at: string
      }>
      total_points: number
      message: string
    }>()
  }

  async getBranchTransactions(page: number = 1, limit: number = 20) {
    return this.client.get(`transactions/branch?page=${page}&limit=${limit}`).json<{
      transactions: Array<{
        id: string
        member_id: string
        staff_user_id: string
        action: "EARN" | "REDEEM"
        product_type: "1_0_LITER" | "1_5_LITER"
        points: number
        receipt_text: string
        created_at: string
      }>
      total: number
      page: number
      limit: number
    }>()
  }
}

export const apiClient = new ApiClient()
