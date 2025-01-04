import { Schema, model } from 'mongoose'
import { type User } from './User.interfaces'
import { ROLES } from '@utils/roles'

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    pictureURL: { type: String },
    role: { type: String, enum: [ROLES.student, ROLES.coordinator, ROLES.admin], default: ROLES.student },
  },
  {
    timestamps: true,
  },
)

export default model('User', UserSchema)
