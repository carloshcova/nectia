import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CarProvider } from './context/CarContext'

import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CarsPage from './pages/CarsPage'
import CarFormPage from './pages/CarFormPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <BrowserRouter>
          <main className='mx-auto sm:w-4/5'>
            <NavBar />

            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage/>} />
              <Route path='/register' element={<RegisterPage/>} />
              
              <Route element={<ProtectedRoute/>} >
                <Route path='/cars' element={<CarsPage/>} />
                <Route path='/add-car' element={<CarFormPage/>} />
                <Route path='/cars/:id' element={<CarFormPage/>} />
                <Route path='/profile' element={<ProfilePage/>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </CarProvider>
    </AuthProvider> 
  )
}
