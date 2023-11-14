import { create } from 'zustand'
import { Bookmark } from '../model/bookmark'

interface State {
  bookmarks: Bookmark[]
  importBookmark: (payload: Bookmark[]) => void
  addBookmark: (payload: Bookmark) => void
  updateBookmark: (payload: Bookmark, id: string) => void
  deleteBookmark: (id: string) => void
  updateIsFavorite: (id: string, value: boolean) => void
}

export const useBookmarkStore = create<State>((set, get) => ({
  bookmarks: [],
  importBookmark: (payload) => {
    set(() => ({
      bookmarks: payload,
    }))
  },
  addBookmark: (payload) => {
    set((state) => ({ bookmarks: [...state.bookmarks, payload] }))
  },
  updateBookmark: (payload, id) => {
    let isBookmarkExist = get().bookmarks.find((bookmark) => bookmark.id === id)

    if (!isBookmarkExist) return

    const newBookmarks = get().bookmarks.map((bookmark) => {
      if (bookmark.id === id) {
        return { ...bookmark, payload }
      }
      return bookmark
    })

    return set({ bookmarks: [...newBookmarks] })
  },
  deleteBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((bookmark) => bookmark.id !== id),
    }))
  },
  updateIsFavorite: (id, value) => {
    let isBookmarkExist = get().bookmarks.find((bookmark) => bookmark.id === id)

    if (!isBookmarkExist) return

    const newBookmarks = get().bookmarks.map((bookmark) => {
      if (bookmark.id === id) {
        return { ...bookmark, isFavorite: value }
      }
      return bookmark
    })

    return set({ bookmarks: [...newBookmarks] })
  },
}))
