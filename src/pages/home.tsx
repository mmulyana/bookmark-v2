import { useEffect } from 'react'
import FormBookmark from '../components/form-bookmark'
import { useAuthStore } from '../store/authStore'
import { useBookmarkStore } from '../store/bookmarkStore'
import { getBookmark } from '../service/bookmark'
import { Bookmark } from '../model/bookmark'
import { Link } from 'react-router-dom'
import FormGrup from '../components/form-group'
import { getGroup } from '../service/group'
import { useGroupStore } from '../store/groupStore'

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
    <div>
      <p>{user?.name}</p>
      <div className='mt-10 grid grid-cols-2 gap-5 max-w-3xl px-4'>
        <FormBookmark />
        <FormGrup />
      </div>
      <div className='mt-4'>
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id}>
            <Link to={bookmark.link} target='_blank'>
              {bookmark.name} - {bookmark.group}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
