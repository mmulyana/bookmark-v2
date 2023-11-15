import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useAuthStore } from '../store/authStore'
import srcImg from '/public/profile.png'
import { signOut } from 'firebase/auth'
import { auth } from '../service/firebase'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default function Profile() {
  const { user, removeUser } = useAuthStore()

  async function handleLogout() {
    signOut(auth)
    await delay(1000)
    removeUser()
  }

  return (
    <div className='flex justify-between items-center bg-[#232323] rounded-md p-2 absolute bottom-4 w-[calc(100%-32px)] left-1/2 -translate-x-1/2 border border-gray-50/10'>
      <div className='flex gap-1 items-center'>
        <img src={srcImg} alt='profile' className='w-7 h-7' />
        <div>
          <p className='text-sm text-gray-300'>{user?.name}</p>
          <p className='text-xs text-gray-400/50'>{user?.email}</p>
        </div>
      </div>
      <button className='text-white' onClick={handleLogout}>
        <ArrowRightOnRectangleIcon width={18} height={18} />
      </button>
    </div>
  )
}
