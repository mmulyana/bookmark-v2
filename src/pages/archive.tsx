import Layout from '../components/layout'
import Search from '../components/search'
import BookmarkItem from '../components/bookmark-item'
import { useBookmarkStore } from '../store/bookmarkStore'
import { useState } from 'react'

export default function Archive() {
  const { bookmarks } = useBookmarkStore()
  const [search, setSearch] = useState<string>('')

  return (
    <Layout>
      <div className='border-b border-gray-300 pb-1.5 flex justify-between items-center'>
        <Search value={search} setValue={setSearch} />
      </div>
      <div className='mt-4'>
        {bookmarks
          .filter((bookmark) => bookmark.isArchive === true)
          .filter((bookmark) => bookmark.name.toLowerCase().includes(search.toLowerCase()))
          .map((bookmark) => (
            <BookmarkItem
              key={bookmark.id}
              bookmark={bookmark}
              type='archive'
            />
          ))}
      </div>
    </Layout>
  )
}
