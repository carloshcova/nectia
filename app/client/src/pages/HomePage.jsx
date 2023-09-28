import { Link } from 'react-router-dom'
import { LogoNectia } from '../components/LogoNectia'

export default function HomePage() {
  return (
    <header className='relative shadow-xl'>
      <div className='h-2/3 bg-gradient-to-br from-[#f90] to-[#ff007e] w-full flex justify-center items-center rounded-md overflow-hidden px-6'>
        <LogoNectia/>
      </div>
      <div className='sm:absolute sm:bottom-10 2xl:bottom-12 w-full text-center'>
        <h1 className='text sm:text-3xl 2xl:text-5xl text-zinc-200 font-bold text-center mt-8 sm:mt-0'>Registro de Automóviles FullStack</h1>
        {/* <h2 className='text-xl 2xl:text-2xl text-zinc-400 font-bold text-center'>App FullStack</h2> */}
        <div className='mt-8 2xl:mt-10'>
          <Link to='/login' className='font-semibold border border-solid border-[#F6A11B] py-2 px-4 rounded-lg hover:shadow hover:shadow-[#F6A11B] transition-all'>INGRESAR</Link>
        </div>
      </div>
    </header>
  )
}
