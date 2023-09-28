import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useCar } from '../context/CarContext'
import { Link, useNavigate, useParams } from 'react-router-dom'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default function CarFormPage() {
  const { register, handleSubmit, setValue } = useForm()
  const { createCar, getCar, updateCar } = useCar()
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    async function loadTAsk(){
      if(params.id) {
        const car = await getCar(params.id)
        console.log(car)
        setValue('brand', car.brand)
        setValue('model', car.model)
        setValue('year', dayjs(car.year).utc().format('YYYY-MM-DD'))
      } 
    }
    loadTAsk()
  }, [])

  const onSubmit = handleSubmit((data) => {
    const dataValid = {
      ...data,
      year: data.year ? dayjs(data.year).utc().format() : dayjs().utc().format()
    }

    if(data.year) dataValid.year = dayjs(data.year).utc().format()

    if(params.id) {
      updateCar(params.id, dataValid)
    } else {
      createCar(dataValid)
    }
    navigate('/cars')
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 w-[500px] p-10 rounded-md'>
        <h1 className='text-2xl font-bold mb-4 text-zinc-200'>Registrar Vehículo</h1>
        <form onSubmit={ onSubmit }>
          <label htmlFor='brand'>Marca</label>
          <input 
            type="text" 
            placeholder="Marca"
            {...register('brand')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            id='brand'
            autoFocus
          />
          <label htmlFor='model'>Modelo</label>
          <input 
            type="text" 
            placeholder="Modelo"
            {...register('model')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            id='model'
          />
          <label htmlFor='year'>Año</label>
          <input 
            type="date" 
            placeholder="Año"
            {...register('year')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            id='year'
          />
          <button className='w-full mt-2 p-2 border border-solid rounded-md border-zinc-500 text-[#F6A11B] shadow-md'>Guardar</button>
        </form>
        <p className='flex gap-x-2 justify-end mt-16'>
          <Link to='/cars' className='text-sky-500'>volver</Link> 
        </p>
      </div>
    </div>
  )
}
