import * as usersData from '@users/users.data'
import { type UserEdit } from './models/User.interfaces'

export const updateUser = async (userId: string, newUser: UserEdit): Promise<any> => {
  try {
    const updatedUser = await usersData.updateUser(userId, newUser)
    return updatedUser
  } catch (error) {
    console.log('errorService', error)
    throw error
  }
}
