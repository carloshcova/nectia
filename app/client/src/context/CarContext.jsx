import { createContext, useContext, useState } from 'react'
import { createCarRequest, getCarsRequest, deleteCarRequest, getCarRequest, updateCarRequest } from '../api/cars'

const CarContext = createContext()

export const useCar = () => {
  const context = useContext(CarContext)
  if (!context) {
    throw new Error('useCar must be used within an CarProvider')
  }
  return context
}

export const CarProvider = ({ children }) => {

  const [cars, setCars] = useState([])

  const getCars = async () => {
    try {
      const res = await getCarsRequest()
      setCars(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCar = async (id) => {
    try {
      const res = await getCarRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }
  
  const createCar = async (car) => {
    const res = await createCarRequest(car)
    console.log(res)
  }

  const deleteCar = async (id) => {
    try {
      const res = await deleteCarRequest(id)
      if (res.status === 204) setCars(cars.filter(car => car._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const updateCar = async (id, car) => {
    try {
      await updateCarRequest(id, car)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CarContext.Provider 
      value={{
        cars,
        createCar,
        getCar,
        getCars,
        deleteCar,
        updateCar,
      }}
    >
      { children }
    </CarContext.Provider>
  )
}