import { Bookmark } from '../model/bookmark'
import { Link } from 'react-router-dom'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'
import DefaultMenu from './menu/default-menu'
import Badge from './badge'
import FavoriteTag from './favorite-tag'
import FavoriteMenu from './menu/favorite-menu'
import ArchiveMenu from './menu/archive-menu'

type Props = {
  bookmark: Bookmark
  type: 'base' | 'favorite' | 'archive'
}

export default function BookmarkItem({ bookmark, type }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useOutsideClick({ callback: handleCloseModal, isOpen: isOpen })

  function handleCloseModal() {
    setIsOpen(false)
  }

  return (
    <div className='flex items-start justify-between border-b border-gray-200 py-3.5 px-2.5'>
      <div className='space-y-0.5'>
        <div className='flex gap-2 items-center'>
          <Link
            to={bookmark.link}
            target='_blank'
            className='text-gray-800 leading-none font-medium'
          >
            {bookmark.name}
          </Link>
          <Badge color={bookmark.color ?? '1'} name={bookmark.group} />
          <FavoriteTag isFavorite={bookmark.isFavorite ?? false} />
        </div>
        <p className='text-sm text-gray-500'>{bookmark.description}</p>
      </div>
      <div className='h-fit relative'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='mt-1 h-6 w-6 rounded hover:bg-gray-100 flex items-center justify-center'
        >
          <EllipsisHorizontalIcon width={20} height={20} />
        </button>
        <div ref={ref}>
          <Menus
            bookmark={bookmark}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            type={type}
          />
        </div>
      </div>
    </div>
  )
}

type PropsMenu = {
  type: string
  isOpen: boolean
  setIsOpen: (val: boolean) => void
  bookmark: Bookmark
}

function Menus({ type = 'home', bookmark, isOpen, setIsOpen }: PropsMenu) {
  switch (type) {
    case 'archive':
      return (
        <ArchiveMenu
          bookmark={bookmark}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )
    case 'favorite':
      return (
        <FavoriteMenu
          bookmark={bookmark}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )
    case 'home':
    default:
      return (
        <DefaultMenu
          bookmark={bookmark}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )
  }
}
