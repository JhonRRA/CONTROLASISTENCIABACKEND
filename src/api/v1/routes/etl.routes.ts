import { Router } from 'express'
import { createCourses } from '@etl/etl.controllers'
import { verifyToken } from '../middlewares/verifyToken'

const route = Router()

export default (app: Router): void => {
  app.use('/etl', route)

  route.use('/create-courses', verifyToken, createCourses)
}
