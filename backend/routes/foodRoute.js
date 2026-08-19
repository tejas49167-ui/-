import express from 'express'
import fs from 'fs'
import multer from 'multer'
import { uploadDir } from '../config/upload.js'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'

const foodRouter = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(uploadDir, { recursive: true })
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`)
  },
})

const upload = multer({ storage })

foodRouter.post('/add', upload.single('image'), addFood)
foodRouter.get('/list', listFood)
foodRouter.post('/remove', removeFood)

export default foodRouter
