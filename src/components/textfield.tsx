import { Field, ErrorMessage } from 'formik'

type Props = {
  type: string
  placeholder: string
  name: string
}

function TextField({ type, placeholder, name }: Props) {
  return (
    <div className='relative bg-[#F5F5F7] rounded-md h-10 w-full gap-2'>
      <Field
        type={type}
        placeholder={placeholder}
        name={name}
        className='bg-transparent outline-none px-2.5 w-full h-full'
      />
      <ErrorMessage
        name={name}
        component='p'
        className='absolute -bottom-4 text-red-500 text-xs'
      />
    </div>
  )
}

export default TextField
