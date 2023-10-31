import { create } from 'zustand'
import { User } from '../model/auth'

interface AuthState {
  user: User | null
  addUser: (payload: User) => void
  removeUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  addUser: (payload) => {
    set(() => ({
      user: payload,
    }))
  },
  removeUser: () => {
    set(() => ({
      user: null,
    }))
  },
}))
