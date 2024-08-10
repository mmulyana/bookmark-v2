import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Group } from '../model/group'
import { useState } from 'react'
import { useAuthStore } from '../store/authStore'
import { groupRequest, updateGroup } from '../service/group'
import { useGroupStore } from '../store/groupStore'

type State = Group

type Props = {
  data?: Group
  setOpen: (val: boolean) => void
}
export default function FormEditGroup(props: Props) {
  const { user } = useAuthStore()
  const { updateGroupById } = useGroupStore()
  const [index, setIndex] = useState<string>(props.data?.color || '1')
  const [isChangeColor, setIsChangeColor] = useState<boolean>(false)

  async function handleSubmit(data: State, actions: any) {
    if (!user) return

    try {
      const payload = {
        ...data,
        color: index,
        uid: user?.uid,
      } as groupRequest & { id: string }

      const res = await updateGroup(payload)
      if (!res || !props.data?.id) return

      updateGroupById(payload, props.data?.id)
      props.setOpen(false)
      actions.setSubmitting(false)
      actions.resetForm()
    } catch (error) {
      console.log(error)
    }
  }

  function changeColor(index: number) {
    setIndex(index.toString())
    setIsChangeColor(false)
  }

  if (!props.data) return null

  return (
    <Formik initialValues={props.data} onSubmit={handleSubmit}>
      <Form>
        <div className='relative h-fit w-full mt-2'>
          <div
            onClick={() => setIsChangeColor(!isChangeColor)}
            className='h-full w-4 absolute top-1/2 left-0 -translate-y-1/2 flex items-center cursor-pointer'
          >
            <div
              className={['w-2 h-2 rounded-full', colors[index]].join(' ')}
            />
          </div>
          {!!isChangeColor && (
            <div className='absolute bottom-0 translate-y-full h-20 w-28 bg-[#232323] z-10 rounded border border-gray-50/10 grid grid-cols-3'>
              {colorsGroup.map((color, index) => (
                <div
                  key={index}
                  onClick={() => changeColor(index + 1)}
                  className='h-full w-full flex justify-center items-center hover:bg-gray-50/10'
                >
                  <div className={['w-3 h-3 rounded-full', color].join(' ')} />
                </div>
              ))}
            </div>
          )}
          <Field
            type='text'
            placeholder='Name'
            name='name'
            className='outline-none pr-16 ml-4 py-1.5 px-2.5 rounded bg-gray-50/10 w-[calc(100%-16px)] h-full text-sm text-white'
            autoFocus
          />
          <ErrorMessage
            name='name'
            component='p'
            className='absolute left-4 -bottom-5 text-red-500 text-xs'
          />
          <div className='absolute top-0 w-fit h-full right-1 flex items-center'>
            <button className='px-2 w-full h-[calc(100%-8px)] bg-blue-700 text-white rounded text-xs'>
              Update
            </button>
          </div>
        </div>
      </Form>
    </Formik>
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

const colorsGroup: string[] = [
  'bg-blue-500',
  'bg-red-500',
  'bg-amber-500',
  'bg-sky-500',
  'bg-teal-500',
]
