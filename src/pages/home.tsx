import { useEffect, useState } from 'react'
import Search from '../components/search'
import Layout from '../components/layout'
import FormBookmark from '../components/form-bookmark'
import BookmarkItem from '../components/bookmark-item'
import { useAuthStore } from '../store/authStore'
import { getBookmark } from '../service/bookmark'
import { DocumentSnapshot } from 'firebase/firestore'
import { useBookmarkStore } from '../store/bookmarkStore'
import useUrlState from '@ahooksjs/use-url-state'

export default function Home() {
  const { user } = useAuthStore()
  const { importBookmark, bookmarks } = useBookmarkStore()
  const [url, _] = useUrlState({ limit: 10 })

  const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const loadBookmarks = async (isInitialLoad: boolean = false) => {
    try {
      if (!user) return

      const result = await getBookmark(
        user?.uid,
        isInitialLoad ? null : lastVisible,
        Number(url.limit)
      )
      importBookmark(
        isInitialLoad ? result.bookmarks : [...bookmarks, ...result.bookmarks]
      )
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
    <Layout>
      <div className='border-b border-gray-300 pb-1.5 flex justify-between items-center'>
        <Search value={search} setValue={setSearch} />
        <button
          className='bg-blue-600/90 text-white pl-2 pr-3.5 py-1 rounded-md text-xs border border-blue-800 flex gap-1'
          onClick={() => setIsOpen(true)}
        >
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
          <span className='font-medium'>Add</span>
        </button>
      </div>
      <div className='mt-4'>
        {bookmarks
          .filter((bookmark) => bookmark.isArchive === false)
          .filter((bookmark) =>
            bookmark.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((bookmark) => (
            <BookmarkItem key={bookmark.id} bookmark={bookmark} type='base' />
          ))}
        <button
          className='mx-auto block px-2 py-0.5 rounded-md border mt-4'
          onClick={handleLoadMore}
        >
          Load More
        </button>
      </div>
      <FormBookmark isOpen={isOpen} setIsOpen={setIsOpen} />
    </Layout>
  )
}
