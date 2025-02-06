import { Router } from 'express'
import { updateUser } from '@users/users.controllers'
import { verifyToken } from '../middlewares/verifyToken'

const route = Router()

export default (app: Router): void => {
  app.use('/users', route)

  route.put('/info', verifyToken, updateUser)
}
