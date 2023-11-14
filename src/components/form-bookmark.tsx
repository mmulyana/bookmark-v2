import { Formik, Form, Field, ErrorMessage } from 'formik'
import { BookmarkRequest, createBookmark } from '../service/bookmark'
import TextField from './textfield'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { useBookmarkStore } from '../store/bookmarkStore'
import { Bookmark } from '../model/bookmark'
import { useAuthStore } from '../store/authStore'
import { useGroupStore } from '../store/groupStore'
import * as Yup from 'yup'
import { useState } from 'react'
import { Group } from '../model/group'

type Props = {
  isOpen: boolean
  setIsOpen: (val: boolean) => any
}

type State = Omit<Bookmark, 'uid' | 'id'>

const schema = Yup.object().shape({
  link: Yup.string().required('Link is required'),
})

const initiState: State = {
  link: '',
  group: '',
  name: '',
  description: '',
}

export default function FormBookmark({ isOpen, setIsOpen }: Props) {
  const { user } = useAuthStore()
  const { addBookmark } = useBookmarkStore()
  const { groups } = useGroupStore()
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)

  async function handleSubmit(data: State, actions: any) {
    const payload = {
      ...data,
      uid: user?.uid,
    } as BookmarkRequest

    if (data.name === '') {
      payload.name = data.link
    }

    const res = await createBookmark(payload)
    if (!res) return

    addBookmark(res as Bookmark)
    actions.setSubmitting(false)
    actions.resetForm()
    setIsOpen(false)
  }

  function handleSelectGroup(group: Group) {
    if (group.id === selectedGroup?.id) {
      setSelectedGroup(null)
      return
    }

    setSelectedGroup(group)
  }

  if (isOpen)
    return (
      <div className='fixed top-0 left-0 h-full w-full '>
        <div
          className='bg-black/50 backdrop-blur-sm w-full h-full'
          onClick={() => setIsOpen(false)}
        />
        <div className='absolute top-10 left-1/2 w-[600px] bg-white -translate-x-1/2 translate-y-0 rounded-lg p-5'>
          <div className='flex justify-between items-start'>
            <div className='flex gap-2.5 items-center'>
              <div className='w-9 h-9 rounded-full flex items-center justify-center text-blue-800 bg-blue-100'>
                <SparklesIcon width={16} height={16} />
              </div>
              <div>
                <p className='text-gray-800 font-medium text-sm'>
                  Add New Bookmark
                </p>
                <p className='text-xs text-gray-400'>
                  Enter link, title, and description
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon width={20} height={20} />
            </button>
          </div>
          <div className='mt-5'>
            <Formik
              initialValues={initiState}
              onSubmit={handleSubmit}
              validationSchema={schema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className='flex flex-col gap-6'>
                    <TextField name='link' type='text' placeholder='Link' />
                    <TextField name='name' type='text' placeholder='Name' />
                    <TextField
                      name='description'
                      type='textarea'
                      placeholder='Description'
                      as='textarea'
                      className='h-fit'
                    />
                    <div>
                      <p className='text-sm text-gray-800 font-medium'>
                        Collections
                      </p>
                      <div className='flex flex-wrap gap-2 mt-2'>
                        {groups.map((group) => (
                          <div
                            key={group.id}
                            className={[
                              'px-3 py-1.5 rounded-full text-xs capitalize cursor-pointer border-[1.5px] hover:border-blue-600',
                              group.id === selectedGroup?.id
                                ? 'border-blue-600 bg-blue-600 text-white'
                                : 'border-transparent bg-gray-100/80',
                            ].join(' ')}
                            onClick={() => handleSelectGroup(group)}
                          >
                            {group.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='flex justify-end mt-2'>
                      <button
                        className={[
                          'bg-blue-600/90 text-white px-5 pt-1 pb-1.5 rounded-md text-sm border border-blue-800 flex gap-1',
                          isSubmitting ? 'pr-4' : '',
                        ].join(' ')}
                        type='submit'
                      >
                        {isSubmitting ? (
                          <div className='flex items-center justify-center gap-2 w-full'>
                            <svg
                              aria-hidden='true'
                              className='inline h-4 w-4 text-white animate-spin fill-gray-500'
                              viewBox='0 0 100 101'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                                fill='currentColor'
                              />
                              <path
                                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                                fill='currentFill'
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className='flex justify-between items-center gap-1 w-full'>
                            <span className='font-semibold'>Save</span>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    )

  return null
}
