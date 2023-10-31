import { create } from 'zustand'
import { Group } from '../model/group'

interface State {
  groups: Group[]
  importGroups: (payload: Group[]) => void
  addGroup: (payload: Group) => void
  updateGroup: (payload: Group, id: string) => void
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
  updateGroup: (payload, id) => {
    let isBookmarkExist = get().groups.find((group) => group.id === id)

    if (!isBookmarkExist) return

    const newGroups = get().groups.map((group) => {
      if (group.id === id) {
        return { ...group, payload }
      }
      return group
    })

    return set({ groups: [...newGroups] })
  },
  deleteGroup: (id) => {
    set((state) => ({
      groups: state.groups.filter((group) => group.id !== id),
    }))
  },
}))
