import { useEffect, useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { useBookmarkStore } from '../store/bookmarkStore'
import { getBookmark } from '../service/bookmark'
import { Bookmark } from '../model/bookmark'
import { getGroup } from '../service/group'
import { useGroupStore } from '../store/groupStore'
import Layout from '../components/layout'

import BookmarkItem from '../components/bookmark-item'
import FormBookmark from '../components/form-bookmark'

export default function Home() {
  const { user } = useAuthStore()
  const { bookmarks, importBookmark } = useBookmarkStore()
  const { importGroups } = useGroupStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
    getAllBookmark(user.uid)
  }, [user])

  return (
    <Layout>
      <div className='border-b border-gray-300 pb-1.5 flex justify-between items-center'>
        <div className='flex gap-2'>
          <button className='flex items-center gap-1 px-2 py-1 rounded-md border border-gray-300 bg-gray-100/50'>
            <span className='text-gray-600 text-xs font-medium'>Sort</span>
            <div className='text-gray-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-3.5 h-3.5'
              >
                <path
                  fillRule='evenodd'
                  d='M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </button>
          <div className='flex items-center gap-1 px-2 py-1 rounded-md border border-gray-300 bg-gray-100/50'>
            <div className='text-gray-400'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-3.5 h-3.5'
              >
                <path
                  fillRule='evenodd'
                  d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <input
              className='bg-transparent outline-none border-none text-sm text-gray-700'
              placeholder='Search by title'
            />
          </div>
        </div>
        <button className='bg-blue-600/90 text-white pl-2 pr-3.5 py-1 rounded-md text-xs border border-blue-800 flex gap-1'>
          <div className='text-white/90'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 6v12m6-6H6'
              />
            </svg>
          </div>
          <span className='font-medium' onClick={() => setIsOpen(true)}>
            Add
          </span>
        </button>
      </div>
      <div className='mt-4'>
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
      <FormBookmark isOpen={isOpen} setIsOpen={setIsOpen} />
    </Layout>
  )
}
