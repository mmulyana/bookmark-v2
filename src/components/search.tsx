export default function Search() {
  return (
    <div className='flex items-center gap-1 px-2 py-1 rounded-md border border-gray-300 bg-gray-100/50'>
      <div className='text-gray-400'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-3.5 h-3.5'
        >
          <path
            fillRule='evenodd'
            d='M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z'
            clipRule='evenodd'
          />
        </svg>
      </div>
      <input
        className='bg-transparent outline-none border-none text-sm text-gray-700'
        placeholder='Search by title'
      />
    </div>
  )
}
