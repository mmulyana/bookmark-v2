import { deleteGroup } from '../service/group'
import { useGroupStore } from '../store/groupStore'

type Props = {
  isOpen: boolean
  setIsOpen: (val: boolean) => any
  id?: string
}

export default function FormDeleteBookmark({ isOpen, setIsOpen, id }: Props) {
  const { deleteGroupById } = useGroupStore()
  const onClose = () => setIsOpen(false)

  const onDelete = async () => {
    try {
      if (!id) return

      const res = await deleteGroup({ id })
      if (!res) return

      deleteGroupById(id)
      setIsOpen(false)
    } catch (error) {
      console.log(error)
    }
  }

  if (isOpen)
    return (
      <div className='fixed top-0 left-0 h-full w-full '>
        <div
          className='bg-black/10 backdrop-blur-[1px] w-full h-full'
          onClick={onClose}
        />
        <div className='absolute top-10 left-1/2 w-[320px] bg-white -translate-x-1/2 translate-y-0 rounded-lg p-5'>
          <p className='text-lg text-center'>Are you sure delete this group</p>
          <div className='mt-4 flex gap-2'>
            <button
              className='w-full py-1 rounded-md border border-gray-300'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className='w-full py-1 rounded-md border border-red-500 bg-red-500 text-white'
              onClick={onDelete}
            >
              Sure
            </button>
          </div>
        </div>
      </div>
    )

  return null
}
