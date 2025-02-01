import { type Request, type Response } from 'express'
import { addCourse } from '@course/Course.Service'

export const createCourses = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.headers
    console.log('🚀 ~ createCourses ~ token:', token)

    interface IPayload {
      role: string
    }

    const payload: IPayload = req.user
    console.log('🚀 ~ createCourses ~ payload:', payload)

    // Verificar el rol del usuario
    const { role } = payload

    if (role !== 'ADMINISTRATOR') {
      res.status(403).json({ message: 'No tienes permiso para realizar esta acción' })
      return
    }

    // Obtener datos del curso desde el cuerpo de la solicitud
    const { title, description } = req.body

    if (!title || !description) {
      res.status(400).json({ message: 'Título y descripción son requeridos' })
      return
    }

    // Insertar el curso en MongoDB
    const newCourse = await addCourse(title, description)

    res.status(201).json({ message: 'El curso se ha creado exitosamente', course: newCourse })
  } catch (error) {
    res.status(500).json({ message: 'ERROR: No se pudo crear el curso' })
  }
}
