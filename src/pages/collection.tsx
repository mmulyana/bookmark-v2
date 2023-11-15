import Layout from '../components/layout'
import Search from '../components/search'
import BookmarkItem from '../components/bookmark-item'
import { useBookmarkStore } from '../store/bookmarkStore'
import { useParams } from 'react-router-dom'

export default function Collection() {
  const { bookmarks } = useBookmarkStore()
  const { group } = useParams()

  return (
    <Layout>
      <div className='border-b border-gray-300 pb-1.5 flex justify-between items-center'>
        <Search />
      </div>
      <div className='mt-4'>
        {bookmarks
          .filter((bookmark) => bookmark.group === group)
          .map((bookmark) => (
            <BookmarkItem key={bookmark.id} bookmark={bookmark} type='base' />
          ))}
      </div>
    </Layout>
  )
}
