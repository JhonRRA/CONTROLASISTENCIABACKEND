import { type Request, type Response } from 'express'

//import * as authServices from './auth.services'

export const createCourses = (req: Request, res: Response): void => {
  const { token } = req.headers
  console.log('🚀 ~ file: etl.controllers.ts:6 ~ createCourses ~ token:', token)

  interface IPayload {
    role: string
  }

  const payload: IPayload = req.user
  console.log('🚀 ~ file: etl.controllers.ts:6 ~ createCourses ~ payload:', payload)

  const havePermission = payload.role === 'STUDENT'

  if (!havePermission) {
    res.status(400).json({ message: 'no tienes permiso para realizar esta accion' })
  } else {
    res.status(200).json({ message: 'los cursos se han creado' })
  }

  res.json({ message: 'informacion recibida' })
}
