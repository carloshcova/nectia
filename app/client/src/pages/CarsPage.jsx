import { useEffect } from "react"
import { useCar } from "../context/CarContext"
import TableCars from '../components/TableCars';

export default function CarsPage() {
  const { getCars, cars } = useCar()

  useEffect(() => {
    getCars()
  }, [])

  if(cars.length === 0) return (<h1>No Hay Vehículos Registrados</h1>)

  return (
    <>
      <TableCars cars={cars}/>
    </>
  )
}
