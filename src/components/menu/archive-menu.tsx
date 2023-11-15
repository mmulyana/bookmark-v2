import {
  TrashIcon,
  StarIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline'
import { useBookmarkStore } from '../../store/bookmarkStore'
import {
  deleteBookmarkDB,
  handleArchiveBookmarkDB,
  handleFavoriteBookmarkDB,
} from '../../service/bookmark'
import { Bookmark } from '../../model/bookmark'

type Props = {
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  bookmark: Bookmark
}

export default function ArchiveMenu({ bookmark, isOpen, setIsOpen }: Props) {
  const { deleteBookmark, updateIsFavorite, updateIsArchive } =
    useBookmarkStore()
  const { id, isFavorite, isArchive } = bookmark

  async function handleDeleteBookmark(id: string) {
    const res = await deleteBookmarkDB(id)
    if (res) deleteBookmark(id)
  }

  async function handleArchiveBookmark(id: string) {
    const value = isArchive ? false : true
    const res = await handleArchiveBookmarkDB(id, value)
    if (res) updateIsArchive(id, value)
    setIsOpen(false)
  }

  return (
    <div
      className={[
        'absolute w-24 h-fit right-0 bg-white p-1 rounded-md space-y-2 z-10 border border-gray-200/50 shadow-lg shadow-gray-300/80',
        isOpen ? 'block' : 'hidden',
      ].join(' ')}
    >
      <button
        className='flex gap-1 items-center hover:bg-gray-300/50 py-0.5 px-1 rounded w-full'
        onClick={() => handleDeleteBookmark(id)}
      >
        <TrashIcon width={15} height={15} opacity={0.4} className='mt-0.5' />
        <span className='text-sm text-gray-800'>Delete</span>
      </button>
      <button
        className='flex gap-1 items-center hover:bg-gray-300/50 py-0.5 px-1 rounded w-full'
        onClick={() => handleArchiveBookmark(id)}
      >
        <ArchiveBoxIcon
          width={15}
          height={15}
          opacity={0.4}
          className='mt-0.5'
        />
        <span className='text-sm text-gray-800'>Unarchive</span>
      </button>
    </div>
  )
}
