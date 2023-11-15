export default function Sort() {
  return (
    <button className='flex items-center gap-1 px-2 py-1 rounded-md border border-gray-300 bg-gray-100/50'>
      <span className='text-gray-600 text-xs font-medium'>Sort</span>
      <div className='text-gray-400'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-3.5 h-3.5'
        >
          <path
            fillRule='evenodd'
            d='M6.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06L8.25 4.81V16.5a.75.75 0 01-1.5 0V4.81L3.53 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zm9.53 4.28a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V7.5a.75.75 0 01.75-.75z'
            clipRule='evenodd'
          />
        </svg>
      </div>
    </button>
  )
}
