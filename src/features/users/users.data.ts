import UserModel from '@users/models/User.model'
import { UserEdit, type User } from '@users/models/User.interfaces'
import { type Types } from 'mongoose'
import { CustomError } from '@utils/errors'

export const findUserByEmail = async function (email: string): Promise<(User & { _id: Types.ObjectId }) | null> {
  const user = await UserModel.findOne({ email }).catch((err) => {
    throw new CustomError({ message: err.message, name: err.name, status: 500 })
  })

  return user
}
export const updateUser = async function (
  userId: string,
  newUser: UserEdit,
): Promise<(User & { _id: Types.ObjectId }) | null> {
  const updatedUser = await UserModel.findByIdAndUpdate(userId, newUser, { new: true }).catch((err) => {
    throw new CustomError({ message: err.message, name: err.name, status: 500 })
  })
  return updatedUser
}
export const findUserById = async function (id: string): Promise<(User & { _id: Types.ObjectId }) | null> {
  const user = await UserModel.findById(id).catch((err) => {
    throw new CustomError({ message: err.message, name: err.name, status: 500 })
  })

  return user
}
