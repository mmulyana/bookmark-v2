import { Field, ErrorMessage } from 'formik'

type Props = {
  name: string
  data: any[]
}

export default function SelectField({ name, data }: Props) {
  return (
    <div className='relative bg-[#F5F5F7] rounded-md h-10 w-full gap-2'>
      <Field
        as='select'
        name={name}
        className='bg-transparent outline-none px-2.5 w-full h-full'
      >
        <option>select {name}</option>
        {data.map((d, index) => (
          <option key={index}>{d.name}</option>
        ))}
      </Field>
      <ErrorMessage
        name={name}
        component='p'
        className='absolute -bottom-4 text-red-500 text-xs'
      />
    </div>
  )
}