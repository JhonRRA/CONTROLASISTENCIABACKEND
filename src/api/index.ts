import { Router } from 'express'
import type { Router as IRouter } from 'express'
import auth from './v1/routes/auth.routes'

export default (): IRouter => {
  const app = Router()
  app.use('/v1', app)

  auth(app)

  return app
}
