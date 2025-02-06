import { type Request, type Response } from 'express'
import * as userServices from './users.services'
import { type UserEdit } from './models/User.interfaces'

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.user
    const newUser = req.body

    const userUpdated = await userServices.updateUser(userId as string, newUser as UserEdit)
    console.log('🚀 ~ updated user:', userUpdated)

    res.status(200).send({ success: true, data: userUpdated })
  } catch (error: any) {
    const errorStatus = error?.status === undefined ? 500 : error.status
    res.status(errorStatus as number).json({ success: false, data: { message: error?.message } })
  }
}
