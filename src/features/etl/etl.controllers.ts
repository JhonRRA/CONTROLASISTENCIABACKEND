import { type Request, type Response } from 'express'
import { createCourseService } from './etl.service'

export const createCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.headers
    console.log('🚀 ~ createCourses ~ token:', token)

    interface IPayload {
      role: string
    }

    const payload: IPayload = req.user
    console.log('🚀 ~ createCourses ~ payload:', payload)

    const { title, description } = req.body

    const newCourse = await createCourseService(title, description, payload.role)

    res.status(201).json({ message: 'El curso se ha creado exitosamente', course: newCourse })
  } catch (error) {
    res.status(500).json({ message: 'ERROR: No se pudo crear el curso' })
  }
}
