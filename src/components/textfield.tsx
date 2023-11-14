import { Field, ErrorMessage } from 'formik'

type Props = {
  type: string
  placeholder: string
  name: string
  as?: string
  className?: string
}

function TextField({
  type,
  placeholder,
  name,
  as = 'input',
  className,
}: Props) {
  return (
    <div className='relative rounded-md h-fit w-full gap-2'>
      <Field
        type={type}
        placeholder={placeholder}
        name={name}
        as={as}
        className={[
          'py-3 px-2.5 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-600 focus:outline-blue-600',
          className ?? 'h-10',
        ].join(' ')}
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
