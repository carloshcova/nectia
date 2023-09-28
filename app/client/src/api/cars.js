import axios from './axios'

export const getCarsRequest= () => axios.get('/cars')

export const getCarRequest= (id) => axios.get(`/cars/${id}`)

export const createCarRequest= (car) => axios.post('/cars', car)

export const updateCarRequest= (id, car) => axios.put(`/cars/${id}`, car)

export const deleteCarRequest= (id) => axios.delete(`/cars/${id}`)
