import Car from '../models/car.model.js'

export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({
      user: req.user.id
    }).populate('user')
    res.json(cars)
  } catch (error) {
    return res.status(500).json({ message: 'Algo salió mal' })
  }
}

export const createCar = async (req, res) => {
  try {
    const { brand, model, year } = req.body
    const newCar = new Car({
      brand,
      model,
      year,
      user: req.user.id
    })
    const saveCar = await newCar.save()
    res.json(saveCar)
  } catch (error) {
    return res.status(500).json({ message: 'Algo salió mal' })
  }
}

export const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('user')
    if (!car) return res.status(404).json({ message: 'Automóvil no encontrado' })
    res.json(car)
  } catch (error) {
    return res.status(404).json({ message: 'Automóvil no encontrado' })
  }
}

export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id)
    if (!car) return res.status(404).json({ message: 'Automóvil no encontrado' })
    return res.sendStatus(204)
  } catch (error) {
    return res.status(404).json({ message: 'Automóvil no encontrado' })    
  }
}

export const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!car) return res.status(404).json({ message: 'Automóvil no encontrado' })
    res.json(car)
  } catch (error) {
    return res.status(404).json({ message: 'Automóvil no encontrado' })
  }
}