import { useState, useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../service/firebase'
import { getMe } from '../service/auth'
import { useNavigate } from 'react-router-dom'
import { User } from '../model/auth'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function ProtectedRoute({ children }: React.PropsWithChildren) {
  const { addUser } = useAuthStore()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        await delay(1000)
        setIsLoading(false)
        navigate('/login')
        return
      }
      const user = await getMe(currentUser.uid)
      if (user) {
        const payload = {
          uid: currentUser.uid,
          email: currentUser.email,
          name: user.name,
        }
        addUser(payload as User)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  if (isLoading) {
    return <p>loading...</p>
  }

  return <>{children}</>
}
