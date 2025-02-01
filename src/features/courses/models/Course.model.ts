import { Schema, model, Types } from 'mongoose'

interface ICourse {
  title: string
  description: string
  createdAt?: Date
}

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const CourseModel = model<ICourse>('Course', CourseSchema)

export default CourseModel
