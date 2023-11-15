import Sidebar from './sidebar'

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <main>
      <Sidebar />
      <div className='ml-[240px] py-4 px-2 min-h-screen'>
        <div className='bg-white rounded-2xl p-5 h-[calc(100vh-32px)] overflow-y-auto'>{children}</div>
      </div>
    </main>
  )
}
