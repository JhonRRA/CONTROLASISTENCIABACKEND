import { addCourse } from '@course/Course.Service'

export const createCourseService = async (title: string, description: string, role: string) => {
  if (role !== 'ADMINISTRATOR') {
    throw new Error('No tienes permiso para realizar esta acción')
  }

  if (!title || !description) {
    throw new Error('Título y descripción son requeridos')
  }

  return await addCourse(title, description)
}
