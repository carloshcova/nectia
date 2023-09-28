import app from './app.js'
import { connectDB } from './db.js'

connectDB()

const PORT = 3000
app.listen(PORT, () => console.log(`Server on port ${PORT}`))