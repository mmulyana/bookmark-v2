import { create } from 'zustand'
import { Group } from '../model/group'

interface State {
  groups: Group[]
  importGroups: (payload: Group[]) => void
  addGroup: (payload: Group) => void
  updateGroupById: (payload: Group, id: string) => void
  deleteGroup: (id: string) => void
}

export const useGroupStore = create<State>((set, get) => ({
  groups: [],
  importGroups: (payload) => {
    set(() => ({
      groups: payload,
    }))
  },
  addGroup: (payload) => {
    set((state) => ({ groups: [...state.groups, payload] }))
  },
  updateGroupById: (payload, id) => {
    set((state) => ({
      groups: state.groups.map((group) => {
        if (group.id === id) {
          return { ...group, ...payload }
        }
        return group
      }),
    }))
  },
  deleteGroup: (id) => {
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== id),
    }))
  },
}))
