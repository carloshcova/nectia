import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import { getCars, getCar, createCar, updateCar, deleteCar } from '../controllers/cars.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { carSchema } from '../validators/car.schema.js'

const router = Router()

router.get('/cars', authRequired, getCars )

router.get('/cars/:id', authRequired, getCar )

router.post('/cars', authRequired, validateSchema(carSchema), createCar )

router.delete('/cars/:id', authRequired, deleteCar )

router.put('/cars/:id', authRequired, updateCar )

export default router