import { useState } from 'react'
import Search from '../components/search'
import Layout from '../components/layout'
import FormBookmark from '../components/form-bookmark'
import BookmarkItem from '../components/bookmark-item'
import { useBookmarkStore } from '../store/bookmarkStore'

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { bookmarks } = useBookmarkStore()
  const [search, setSearch] = useState<string>('')

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
          .filter((bookmark) => bookmark.name.toLowerCase().includes(search.toLowerCase()))
          .map((bookmark) => (
            <BookmarkItem key={bookmark.id} bookmark={bookmark} type='base' />
          ))}
      </div>
      <FormBookmark isOpen={isOpen} setIsOpen={setIsOpen} />
    </Layout>
  )
}
