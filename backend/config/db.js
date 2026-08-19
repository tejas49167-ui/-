import mongoose from 'mongoose'

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return
  }

  const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI

  if (!mongoUri) {
    console.log('MONGODB_URI is missing. Add it to backend/config/atlas-credentials.env before connecting MongoDB.')
    return
  }

  await mongoose.connect(mongoUri)
  console.log('DB Connected')
}
