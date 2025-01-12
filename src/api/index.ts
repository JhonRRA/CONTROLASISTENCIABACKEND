import { Router } from 'express'
import type { Router as IRouter } from 'express'
import auth from './v1/routes/auth.routes'
import etl from './v1/routes/etl.routes'

export default (): IRouter => {
  const app = Router()
  app.use('/v1', app)

  auth(app)
  etl(app)

  return app
}
