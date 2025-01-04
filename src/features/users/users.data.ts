import UserModel from '@users/models/User.model'
import { type User } from '@users/models/User.interfaces'
import { type Types } from 'mongoose'
import { CustomError } from '@utils/errors'

export const findUserByEmail = async function (email: string): Promise<(User & { _id: Types.ObjectId }) | null> {
  const user = await UserModel.findOne({ email }).catch((err) => {
    throw new CustomError({ message: err.message, name: err.name, status: 500 })
  })

  return user
}