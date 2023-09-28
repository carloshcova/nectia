import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const { register, handleSubmit, formState: {errors} } = useForm()
  const { signup, isAuthenticated, error: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/cars')
    }
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  }) 

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 w-[500px] p-10 rounded-md'>
        {
          registerErrors.map((error, i) => (
            <div key={i} className='bg-red-500 text-white my-2 p-2 text-center'>{error}</div>
          ))
        }
        <h1 className='text-2xl font-bold mb-4 text-zinc-200'>Registrar Usuario</h1>
        <form onSubmit={ onSubmit }>
          <input 
            type='text' 
            {...register('user', {required: true})}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
            placeholder='usuario'
          />
          {
            errors.user && <p className='text-red-500'>Usuario es requerido</p>
          }
          <input 
            type='password' 
            {...register('password', {required: true})} 
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
            placeholder='password'
          />
          {
            errors.password && <p className='text-red-500'>Password es requerida</p>
          }
          <button type='submit' className='w-full mt-2 p-2 border border-solid rounded-md border-zinc-500 text-[#F6A11B] transition-all hover:shadow hover:shadow-[#F6A11B]'>Registrarme</button>
        </form>
        <p className='flex gap-x-2 justify-between mt-16'>
          ¿Ya tienes una cuenta? <Link to='/login' className='text-sky-500'>Ingresar</Link> 
        </p>
      </div>
    </div>
  )
}
