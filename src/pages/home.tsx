import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useBookmarkStore } from '../store/bookmarkStore'
import { getBookmark } from '../service/bookmark'
import { Bookmark } from '../model/bookmark'
import { getGroup } from '../service/group'
import { useGroupStore } from '../store/groupStore'
import Layout from '../components/layout'

import BookmarkItem from '../components/bookmark-item'

export default function Home() {
  const { user } = useAuthStore()
  const { bookmarks, importBookmark } = useBookmarkStore()
  const { importGroups } = useGroupStore()

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
      <div className='mt-4'>
        {bookmarks.map((bookmark) => (
          <BookmarkItem key={bookmark.id} bookmark={bookmark}/>
        ))}
      </div>
    </Layout>
  )
}
