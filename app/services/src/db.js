import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://nectia:nectia@nectia.e6bflac.mongodb.net/?retryWrites=true&w=majority')
    console.log('>>> DB is connected')
  } catch (error) {
    console.log(error)
  }
}