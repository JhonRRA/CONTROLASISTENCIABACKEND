import { type Types } from 'mongoose'

import * as usersData from '@users/users.data'
import * as authData from '@auth/auth.data'

import { createAccessToken, verifyAndDecodeAccessToken } from '@libs/jwt'
import { getUserInfoByGToken } from '@libs/googleOAuth'

import { CustomError } from 'src/utils/errors'
import { type User } from '@users/models/User.interfaces'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const googleOAuth = async (token: any): Promise<any> => {
  try {
    const userGoogleInfo = await getUserInfoByGToken(token)
    console.log('🚀 ~ googleOAuth ~ userGoogleInfo:', userGoogleInfo)

    const { name, email, picture } = userGoogleInfo

    // validates that the user is not registered
    const userInfo = await usersData.findUserByEmail(email)
    console.log('🚀 ~ file: auth.service.ts:61 ~ googleOAuth ~ userInfo:', userInfo)

    if (userInfo !== null) {
      const tokenGenerated = await createAccessToken({ id: userInfo._id, role: userInfo.role })
      return { token: tokenGenerated, userInfo }
    }

    const registeredUser = await authData.userGoogleSignUp({ fullName: name, email, pictureURL: picture })
    console.log('🚀 ~ file: auth.service.ts:70 ~ googleOAuth ~ userRegistered:', registeredUser)

    // generamos el JWT
    const tokenGenerated = await createAccessToken({ id: registeredUser._id, role: registeredUser.role })

    return { token: tokenGenerated, userInfo: registeredUser }
  } catch (error) {
    console.log('errorService', error)
    throw error
  }
}

export const verifyToken = async (token: string): Promise<(User & { _id: Types.ObjectId }) | null> => {
  try {
    const payload = verifyAndDecodeAccessToken(token)

    const user = await usersData.findUserById(payload.id)

    if (user === null) throw new CustomError({ message: 'User not found', status: 400 })

    return user
  } catch (error) {
    console.log('errorService', error)
    throw error
  }
}
