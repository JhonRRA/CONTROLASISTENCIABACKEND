import { Router } from 'express'
import { googleOAuth, verifyToken } from '@auth/auth.controllers'

const route = Router()

export default (app: Router): void => {
  app.use('/auth', route)

  route.get('/g-oauth', googleOAuth)

  route.get('/verify', verifyToken)
}
