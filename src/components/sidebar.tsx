import { Link } from 'react-router-dom'
import { useGroupStore } from '../store/groupStore'

export default function Sidebar() {
  const { groups } = useGroupStore()

  return (
    <div className='w-[240px] h-full absolute top-0 left-0 px-4 pt-5'>
      <p className='text-gray-100 text-base font-medium flex items-center gap-2'>
        Bookmark{' '}
        <span className='text-white bg-blue-900 text-[10px] w-5 h-5 rounded flex justify-center items-center border border-blue-700'>
          v2
        </span>
      </p>
      <div className='mt-8 flex flex-col gap-4'>
        <Link to='/' className='text-white text-sm'>
          All
        </Link>
        <Link to='/favorites' className='text-white text-sm'>
          Favorites
        </Link>
        <Link to='/archives' className='text-white text-sm'>
          Archives
        </Link>
      </div>

      <p className='mt-10 text-gray-100/80 text-xs uppercase font-medium'>Collections</p>
      <div className='mt-2.5 flex flex-col gap-3'>
        {groups.map((group) => (
          <Link
            to={`/index?group=${group.name}`}
            className='text-white text-sm'
          >
            #{group.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
