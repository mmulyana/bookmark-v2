import { Link } from 'react-router-dom'
import { useGroupStore } from '../store/groupStore'
import { PlusIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import FormGroup from './form-group'
import {
  StarIcon,
  ArchiveBoxIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import useOutsideClick from '../hooks/useOutsideClick'
import Profile from './profile'

export default function Sidebar() {
  const { groups } = useGroupStore()
  const [isOpen, setIsOpen] = useState(false)
  const formRef = useOutsideClick({
    callback: handleCloseModal,
    isOpen: isOpen,
  })

  function handleCloseModal() {
    setIsOpen(false)
  }

  return (
    <div className='w-[240px] h-full absolute top-0 left-0 px-4 pt-5'>
      <p className='text-gray-100 text-base font-medium flex items-center gap-2'>
        Bookmark{' '}
        <span className='text-white bg-blue-900 text-[10px] w-5 h-5 rounded flex justify-center items-center border border-blue-700'>
          v2
        </span>
      </p>
      <div className='mt-8 flex flex-col gap-4'>
        <Link
          to='/'
          className='text-white text-sm flex gap-2 items-center px-1.5 py-1 hover:bg-gray-50/10 rounded'
        >
          <Squares2X2Icon width={16} height={16} opacity={0.7} />
          All
        </Link>
        <Link
          to='/favorites'
          className='text-white text-sm flex gap-2 items-center px-1.5 py-1 hover:bg-gray-50/10 rounded'
        >
          <StarIcon width={16} height={16} opacity={0.7} />
          Favorites
        </Link>
        <Link
          to='/archives'
          className='text-white text-sm flex gap-2 items-center px-1.5 py-1 hover:bg-gray-50/10 rounded'
        >
          <ArchiveBoxIcon width={16} height={16} opacity={0.7} />
          Archives
        </Link>
      </div>

      <div className='flex justify-between items-center mt-8'>
        <p className='text-gray-100/80 text-xs uppercase font-medium'>
          Collections
        </p>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='w-5 h-5 rounded bg-gray-100/20 text-white flex items-center justify-center hover:bg-white hover:text-gray-900'
        >
          <PlusIcon height={16} width={16} />
        </button>
      </div>
      <div className='mt-2.5 flex flex-col gap-3 max-h-40 overflow-y-auto border-b border-gray-50/10 pb-2 group__wrapper'>
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/collection/${group.name}`}
            className='text-white text-sm flex items-center gap-2 capitalize hover:bg-gray-50/10 py-1 px-1.5 w-[calc(100%-4px)] rounded'
          >
            <div
              className={[
                'w-2 h-2 rounded-full',
                colors[group.color ?? '1'],
              ].join(' ')}
            />
            {group.name}
          </Link>
        ))}
      </div>
      {!!isOpen && (
        <div ref={formRef}>
          <FormGroup setIsOpen={setIsOpen} />
        </div>
      )}
      <Profile />
    </div>
  )
}

type Color = {
  [key: string]: string
}

const colors: Color = {
  '1': 'bg-blue-500',
  '2': 'bg-red-500',
  '3': 'bg-amber-500',
  '4': 'bg-sky-500',
  '5': 'bg-teal-500',
}
