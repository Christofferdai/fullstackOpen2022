import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'
import config from './utils/config.js'
import logger from './utils/logger.js'
import blogsRouter from './controllers/blogs.js'
import usersRouter from './controllers/users.js'

logger.info('connecting to', config.MONGOOSEURL)
mongoose.connect(config.MONGOOSEURL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

export default app

