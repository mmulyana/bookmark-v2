import { Suspense, useEffect } from 'react'
import { getGroup } from './service/group'
import { useAuthStore } from './store/authStore'
import { useGroupStore } from './store/groupStore'
import ProtectedRoute from './utils/protected-route'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Collection from './pages/collection'
import Home from './pages/home'
import Favorite from './pages/favorite'
import Archive from './pages/archive'
import Login from './pages/login'
import Register from './pages/register'
import LoadingScreen from './components/loading-screen'

const useRoutes = () => [
  {
    path: '/',
    element: <Home />,
    isProtected: true,
  },
  {
    path: '/favorites',
    element: <Favorite />,
    isProtected: true,
  },
  {
    path: '/archives',
    element: <Archive />,
    isProtected: true,
  },
  {
    path: '/collection/:group',
    element: <Collection />,
    isProtected: true,
  },
  {
    path: '/login',
    element: <Login />,
    isProtected: false,
  },
  {
    path: '/register',
    element: <Register />,
    isProtected: false,
  },
]

function App() {
  const routes = useRoutes()
  const { user } = useAuthStore()
  const { importGroups } = useGroupStore()

  useEffect(() => {
    async function getGroups(uid: string) {
      const groups = await getGroup(uid)

      importGroups(groups as never)
    }

    if (!user) return
    getGroups(user.uid)
  }, [user])

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, idx) => (
          <Route
            key={idx}
            path={route.path}
            element={
              <Suspense fallback={<LoadingScreen />}>
                {route.isProtected ? (
                  <ProtectedRoute>{route.element}</ProtectedRoute>
                ) : (
                  route.element
                )}
              </Suspense>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
