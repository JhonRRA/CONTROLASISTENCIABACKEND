import CourseModel from './models/Course.model'
import { CustomError } from '@utils/errors'

export const addCourse = async (title: string, description: string) => {
  const newCourse = new CourseModel({ title, description })

  const createdCourse = await newCourse.save().catch((err) => {
    throw new CustomError({ message: err.message, name: err.name, status: 500 })
  })

  return createdCourse
}
