import { Formik, Form } from 'formik'
import TextField from '../components/textfield'
import { RegisterWithEmail } from '../service/auth'
import { Link, useNavigate } from 'react-router-dom'

type State = {
  name: string
  email: string
  password: string
}

const initiState: State = {
  name: '',
  email: '',
  password: '',
}

export default function Register() {
  const navigate = useNavigate()

  async function handleSubmit(data: State) {
    const res = await RegisterWithEmail(data.email, data.password, data.name)
    if (res) {
      alert('success')
      navigate('/login')
    }
  }

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full'>
      <div className='max-w-[360px] p-5 rounded-xl mx-auto'>
        <p className='text-gray-100 text-lg font-medium flex items-center gap-2 text-center justify-center mb-4'>
          Bookmark{' '}
          <span className='text-white bg-blue-900 text-[10px] w-5 h-5 rounded flex justify-center items-center border border-blue-700'>
            v2
          </span>
        </p>
        <Formik initialValues={initiState} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className='flex flex-col gap-6'>
                <TextField
                  name='name'
                  type='text'
                  placeholder='Name'
                  className='bg-[#232323] outline-none border-none mt-1.5 text-white'
                />
                <TextField
                  name='email'
                  type='text'
                  placeholder='Email'
                  className='bg-[#232323] outline-none border-none mt-1.5 text-white'
                />

                <TextField
                  name='password'
                  type='password'
                  placeholder='Password'
                  className='bg-[#232323] outline-none border-none mt-1.5 text-white'
                />
                <div className='mt-2'>
                  <button
                    className='text-center w-full bg-blue-800 hover:bg-blue-800/50 text-white border border-blue-900 py-2.5 rounded'
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
                      <p className='font-medium text-center text-sm'>
                        Register
                      </p>
                    )}
                  </button>
                  <p className='text-white text-center mt-2.5 text-sm'>
                    already have an account?{' '}
                    <Link to='/login' className='text-blue-500'>
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
