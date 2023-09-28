import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'


export const authRequired = (req, res, next) => {
  try {
    const { token } = req.cookies
  
    if (!token) return res.status(401).json({ message: 'No token, autorización denegada' })
  
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: 'Token no válido' })
      req.user = user
      next()
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}