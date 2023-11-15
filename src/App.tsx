import { useEffect } from 'react'
import { getGroup } from './service/group'
import { Bookmark } from './model/bookmark'
import { getBookmark } from './service/bookmark'
import { useAuthStore } from './store/authStore'
import { useGroupStore } from './store/groupStore'
import ProtectedRoute from './utils/protected-route'
import { useBookmarkStore } from './store/bookmarkStore'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Archive, Favorite, Home, Login, Register } from './pages'

function App() {
  const { user } = useAuthStore()
  const { importGroups } = useGroupStore()
  const { bookmarks, importBookmark } = useBookmarkStore()

  useEffect(() => {
    async function getAllBookmark(uid: string) {
      const bookmarks = await getBookmark(uid)
      const groups = await getGroup(uid)
      if (!bookmarks) return
      if (!groups) return

      importBookmark(bookmarks as Bookmark[])
      importGroups(groups as never)
    }
    if (!user) return
    if (bookmarks.length > 1) return
    getAllBookmark(user.uid)
  }, [user])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
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

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
