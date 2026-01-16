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
                window.location.href = '/login'
              }
            }
            return response
          },
        ],
      },
    })
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    }
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
        localStorage.setItem('auth_user', JSON.stringify(response.staff_user))
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
