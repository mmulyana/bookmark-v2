import { useEffect, useState } from 'react'
import { getGroup } from './service/group'
import { Bookmark } from './model/bookmark'
import { getBookmark } from './service/bookmark'
import { useAuthStore } from './store/authStore'
import { useGroupStore } from './store/groupStore'
import ProtectedRoute from './utils/protected-route'
import { useBookmarkStore } from './store/bookmarkStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Archive, Favorite, Home, Login, Register } from './pages'
import Collection from './pages/collection'
import { DocumentSnapshot } from 'firebase/firestore'

function App() {
  const { user } = useAuthStore()
  const { importGroups } = useGroupStore()
  const { bookmarks, importBookmark } = useBookmarkStore()
  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null)

  useEffect(() => {
    async function getGroups(uid: string) {
      const groups = await getGroup(uid)

      importGroups(groups as never)
    }

    if (!user) return
    getGroups(user.uid)
  }, [user])

  const loadBookmarks = async (isInitialLoad: boolean = false) => {
    try {
      if (!user) return

      const result = await getBookmark(
        user?.uid,
        isInitialLoad ? null : lastVisible
      )
      importBookmark([...bookmarks, ...result.bookmarks] as Bookmark[])
      setLastVisible(result.lastVisible)
    } catch (error) {
      console.error('Error loading bookmarks:', error)
    }
  }

  useEffect(() => {
    if (!user) return

    loadBookmarks(true)
  }, [user])

  const handleLoadMore = () => {
    loadBookmarks()
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home handleLoadMore={handleLoadMore}/>
            </ProtectedRoute>
          }
        />
        <Route
          path='/favorites'
          element={
            <ProtectedRoute>
              <Favorite />
            </ProtectedRoute>
          }
        />
        <Route
          path='/archives'
          element={
            <ProtectedRoute>
              <Archive />
            </ProtectedRoute>
          }
        />
        <Route
          path='/collection/:group'
          element={
            <ProtectedRoute>
              <Collection />
            </ProtectedRoute>
          }
        />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
