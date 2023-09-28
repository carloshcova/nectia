import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../utils/jwt.js'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const register = async (req, res) => {
  const { user, password } = req.body

  const userFound = await User.findOne({ user })
  if (userFound) return res.status(400).json(['Usuario ya existe'])

  try {

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User({ user, password: passwordHash })
    const userSaved = await newUser.save()
    
    const token = await createAccessToken({id: userSaved._id})
    res.cookie('token', token)

    res.json({
      id: userSaved._id,
      user: userSaved.user,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    })
  
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  const { user, password } = req.body

  try {

    const userFound = await User.findOne({ user })
    if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' })

    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) return res.status(400).json({ message: 'Password incorrecta' })
    
    const token = await createAccessToken({id: userFound._id})
    res.cookie('token', token)

    res.json({
      id: userFound._id,
      user: userFound.user,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = (req, res) => {
  res.cookie('token', '', {expires: new Date(0)})
  res.sendStatus(200)
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(400).json({ message: 'Usuario no encontrado' })

  res.json({
    id: userFound._id,
    user: userFound.user,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt
  })
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  
  if (!token) return res.status(401).json({ message: 'No autorizado' })
  
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'No autorizado' })
    
    const userFound = await User.findById(user.id)
    if(!userFound) return res.status(401).json({ message: 'No autorizado' })

    res.json({
      id: userFound._id,
      user: userFound.user,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  })
}