import {
    TrashIcon,
    StarIcon,
  } from '@heroicons/react/24/outline'
  import { useBookmarkStore } from '../../store/bookmarkStore'
  import {
    deleteBookmarkDB,
    handleFavoriteBookmarkDB,
  } from '../../service/bookmark'
  import { Bookmark } from '../../model/bookmark'
  
  type Props = {
    isOpen: boolean
    setIsOpen: (val: boolean) => void
    bookmark: Bookmark
  }
  
  export default function FavoriteMenu({ bookmark, isOpen, setIsOpen }: Props) {
    const { deleteBookmark, updateIsFavorite } =
      useBookmarkStore()
    const { id, isFavorite } = bookmark
  
    async function handleDeleteBookmark(id: string) {
      const res = await deleteBookmarkDB(id)
      if (res) deleteBookmark(id)
    }
  
    async function handleFavoriteBookmark(id: string) {
      const value = isFavorite ? false : true
      const res = await handleFavoriteBookmarkDB(id, value)
      if (res) updateIsFavorite(id, value)
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
          onClick={() => handleFavoriteBookmark(id)}
        >
          <StarIcon width={15} height={15} opacity={0.4} className='mt-0.5' />
          <span className='text-sm text-gray-800'>Favorite</span>
        </button>
      </div>
    )
  }
  