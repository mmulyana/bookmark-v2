import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useAuthStore } from '../store/authStore'
import { Group } from '../model/group'
import { createGroup, groupRequest } from '../service/group'
import { useGroupStore } from '../store/groupStore'
import * as Yup from 'yup'

type State = Omit<Group, 'uid' | 'id'>

const initiState: State = {
  name: '',
}

const schema = Yup.object().shape({
  name: Yup.string().required('*name is required'),
})

export default function FormGroup({
  setIsOpen,
}: {
  setIsOpen: (val: boolean) => void
}) {
  const { user } = useAuthStore()
  const { addGroup } = useGroupStore()
  const [index, setIndex] = useState<string>('1')
  const [isChangeColor, setIsChangeColor] = useState<boolean>(false)

  async function handleSubmit(data: State, actions: any) {
    if (!user) return

    const payload = {
      ...data,
      color: index,
      uid: user?.uid,
    } as groupRequest

    const res = await createGroup(payload)
    if (!res) return

    setIsOpen(false)
    addGroup(res as Group)
    actions.setSubmitting(false)
    actions.resetForm()
  }

  function changeColor(index: number) {
    setIndex(index.toString())
    setIsChangeColor(false)
  }

  return (
    <Formik
      initialValues={initiState}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
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
            className='outline-none ml-4 py-1.5 px-2.5 rounded bg-gray-50/10 w-[calc(100%-16px)] h-full text-sm text-white'
            autoFocus
          />
          {/* <div className='absolute -bottom-[2px] left-4 w-[calc(100%-16px)] h-[1px] bg-gray-50/10' /> */}
          <ErrorMessage
            name='name'
            component='p'
            className='absolute left-4 -bottom-5 text-red-500 text-xs'
          />
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
