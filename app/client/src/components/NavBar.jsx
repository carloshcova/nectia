import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className='bg-[#282828] mb-10 flex justify-between px-10 rounded-lg items-center h-16'>
      <div className='flex items-center'>
        <Link to={ isAuthenticated ? '/cars' : '/' }>
          <img src="/logoblanco.svg" alt="logo nectia" className='w-[60px]' />
        </Link>
      </div>
      <ul className='flex gap-x-4'>
        {
          isAuthenticated ? (
            <>
              <li>
                <Link className='border border-solid border-[#F6A11B] px-4 py-2 rounded-md hover:shadow hover:shadow-[#F6A11B] transition-all' to='/add-car'>Añadir Automóvil</Link>
              </li>
              <li>
                <Link to='/' onClick={() => logout()}>Salir</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className='border border-solid border-[#F6A11B] px-4 py-2 rounded-md hover:shadow hover:shadow-[#F6A11B] transition-all' to='/login'>Ingresar</Link>
              </li>
              <li>
                <Link to='/register'>Registrame</Link>
              </li>
            </>
          )
        }
      </ul>
    </nav>
  )
}
