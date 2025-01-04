import express from 'express'
import type { Request, Response, Express } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from '../config/index'

export default async (app: Express): Promise<Express> => {
  app.use(
    cors({
      credentials: true, //para poder enviar credenciales
      origin: config.frontendURL, //solo los dominios que se coloquen aqui podran consultar nuestro backend
    }),
  )

  app.use(morgan('dev'))

  // Transforms the raw string of req.body into json
  app.use(express.json())

  // mdiddleware for parsing URL-encoded data sent from HTML forms.
  app.use(express.urlencoded({ extended: false })) //Limitado a texto plano

  app.get('/ping', (_req: Request, res: Response) => {
    res.send('pong')
  })

  //Esto es para cualquier otra ruta (que no cumple con las anteriores)
  app.get('*', (_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      data: { message: 'Not Found' },
    })
  })

  return app
}
