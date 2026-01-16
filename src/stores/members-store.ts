import { create } from 'zustand'
import { apiClient } from '@/lib/api-client'

interface Member {
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
}

interface MembersState {
  members: Member[]
  total: number
  page: number
  limit: number
  search: string
  isLoading: boolean
  error: string | null
  fetchMembers: (search?: string, page?: number) => Promise<void>
  createMember: (data: {
    name: string
    last4: string
    branch: string
    registration_receipt_number: string
  }) => Promise<void>
  setSearch: (search: string) => void
  setPage: (page: number) => void
  clearError: () => void
}

export const useMembersStore = create<MembersState>((set, get) => ({
  members: [],
  total: 0,
  page: 1,
  limit: 20,
  search: '',
  isLoading: false,
  error: null,

  fetchMembers: async (search?: string, page?: number) => {
    set({ isLoading: true, error: null })
    try {
      const currentSearch = search !== undefined ? search : get().search
      const currentPage = page !== undefined ? page : get().page
      
      const response = await apiClient.getMembers(currentSearch, currentPage, get().limit)
      
      set({
        members: response.members || [],
        total: response.total || 0,
        page: response.page || 1,
        limit: response.limit || 20,
        search: currentSearch,
        isLoading: false,
      })
    } catch (error) {
      set({
        members: [],
        total: 0,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch members',
      })
    }
  },

  createMember: async (data) => {
    set({ isLoading: true, error: null })
    try {
      await apiClient.createMember(data)
      await get().fetchMembers()
      set({ isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to create member',
      })
      throw error
    }
  },

  setSearch: (search: string) => {
    set({ search })
  },

  setPage: (page: number) => {
    set({ page })
  },

  clearError: () => {
    set({ error: null })
  },
}))
