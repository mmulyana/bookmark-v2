import Layout from '../components/layout'
import Search from '../components/search'
import BookmarkItem from '../components/bookmark-item'
import { useBookmarkStore } from '../store/bookmarkStore'

export default function Archive() {
  const { bookmarks } = useBookmarkStore()

  return (
    <Layout>
      <div className='border-b border-gray-300 pb-1.5 flex justify-between items-center'>
        <Search />
      </div>
      <div className='mt-4'>
        {bookmarks
          .filter((bookmark) => bookmark.isArchive === true)
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
