import { Link } from 'react-router-dom'
import { useGroupStore } from '../store/groupStore'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import FormGroup from './form-group'
import {
  StarIcon,
  ArchiveBoxIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline'
import useOutsideClick from '../hooks/useOutsideClick'
import Profile from './profile'
import { Group } from '../model/group'
import FormEditGroup from './form-edit-group'
import FormDeleteBookmark from './form-delete-group'

export default function Sidebar() {
  const { groups } = useGroupStore()
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  const [selectedId, setSelectedId] = useState('')
  const [selectedGroup, setSelectedGroup] = useState<Group>()

  const formAddRef = useOutsideClick({
    callback: () => setIsOpen(false),
    isOpen: isOpen,
  })
  const formEditRef = useOutsideClick({
    callback: () => setIsEdit(false),
    isOpen: isEdit,
  })

  function handleUpdateModal(group: Group) {
    if (isOpen) setIsOpen(false)

    setSelectedGroup(group)
    setIsEdit(true)
  }
  function handleDeleteModal(id: string) {
    setSelectedId(id)
    setIsDelete(true)
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
          <div
            key={group.id}
            className='text-white text-sm flex items-center justify-between capitalize hover:bg-gray-50/10 py-1 px-1.5 w-[calc(100%-4px)] rounded'
          >
            <div className='flex items-center gap-2 '>
              <div
                className={[
                  'w-2 h-2 rounded-full',
                  colors[group.color ?? '1'],
                ].join(' ')}
              />
              <Link to={`/collection/${group.id}`}>{group.name}</Link>
            </div>
            <div className='flex gap-2 items-center'>
              <button
                onClick={() => handleUpdateModal(group)}
                className='text-white/40'
              >
                <PencilIcon className='text-sm w-3 h-3' />
              </button>
              <button
                onClick={() => handleDeleteModal(group.id)}
                className='text-red-400'
              >
                <TrashIcon className='text-sm w-3 h-3' />
              </button>
            </div>
          </div>
        ))}
      </div>
      {!!isOpen && (
        <div ref={formAddRef}>
          <FormGroup setIsOpen={setIsOpen} />
        </div>
      )}
      {!isOpen && isEdit && (
        <div ref={formEditRef}>
          <FormEditGroup data={selectedGroup} setOpen={setIsEdit} />
        </div>
      )}
      {isDelete && (
        <FormDeleteBookmark
          isOpen={isDelete}
          setIsOpen={setIsDelete}
          id={selectedId}
        />
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
