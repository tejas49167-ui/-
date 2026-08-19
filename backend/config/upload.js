import path from 'path'

export const uploadDir = process.env.VERCEL ? '/tmp/uploads' : 'uploads'

export const getUploadPath = (filename) => path.join(uploadDir, filename)
