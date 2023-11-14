import { Bookmark } from '../model/bookmark'
import { Link } from 'react-router-dom'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import {
  TrashIcon,
  StarIcon,
  ArchiveBoxIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import useOutsideClick from '../hooks/useOutsideClick'

export default function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useOutsideClick({ callback: handleCloseModal, isOpen: isOpen })

  function handleCloseModal() {
    setIsOpen(false)
  }

  return (
    <div className='flex items-start justify-between'>
      <div className='flex gap-2 items-start'>
        <img
          src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.link}`}
          className='w-5 h-5 rounded mt-0.5'
        />
        <div className='space-y-0.5'>
          <div className='flex gap-2 items-center'>
            <Link
              to={bookmark.link}
              target='_blank'
              className='text-gray-800 leading-none font-medium'
            >
              {bookmark.name}
            </Link>
            <div
              className={[
                'px-1.5 py-0.5 rounded border text-xs capitalize',
                borders[bookmark.color ?? '1'],
                background[bookmark.color ?? '1'],
                colors[bookmark.color ?? '1'],
              ].join(' ')}
            >
              {bookmark.group}
            </div>
          </div>
          <p className='text-sm text-gray-500'>{bookmark.description}</p>
        </div>
      </div>
      <div className='h-fit relative'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='mt-1 h-6 w-6 rounded hover:bg-gray-300 flex items-center justify-center'
        >
          <EllipsisHorizontalIcon width={20} height={20} />
        </button>
        <div
          className={[
            'absolute w-24 h-fit right-0 bg-white p-1 rounded-md space-y-2',
            isOpen ? 'block' : 'hidden',
          ].join(' ')}
          ref={ref}
        >
          <button className='flex gap-1 items-center hover:bg-gray-300/50 py-0.5 px-1 rounded w-full'>
            <TrashIcon
              width={15}
              height={15}
              opacity={0.4}
              className='mt-0.5'
            />
            <span className='text-sm text-gray-800'>Delete</span>
          </button>
          <button className='flex gap-1 items-center hover:bg-gray-300/50 py-0.5 px-1 rounded w-full'>
            <StarIcon width={15} height={15} opacity={0.4} className='mt-0.5' />
            <span className='text-sm text-gray-800'>Favorite</span>
          </button>
          <button className='flex gap-1 items-center hover:bg-gray-300/50 py-0.5 px-1 rounded w-full'>
            <ArchiveBoxIcon
              width={15}
              height={15}
              opacity={0.4}
              className='mt-0.5'
            />
            <span className='text-sm text-gray-800'>Archive</span>
          </button>
        </div>
      </div>
    </div>
  )
}

type Color = {
  [key: string]: string
}

const background: Color = {
  '1': 'bg-blue-500/10',
  '2': 'bg-red-500/10',
  '3': 'bg-amber-500/10',
  '4': 'bg-sky-500/10',
  '5': 'bg-teal-500/10',
}

const colors: Color = {
  '1': 'text-blue-700',
  '2': 'text-red-700',
  '3': 'text-amber-700',
  '4': 'text-sky-700',
  '5': 'text-teal-700',
}

const borders: Color = {
  '1': 'border-blue-500',
  '2': 'border-red-500',
  '3': 'border-amber-500',
  '4': 'border-sky-500',
  '5': 'border-teal-500',
}