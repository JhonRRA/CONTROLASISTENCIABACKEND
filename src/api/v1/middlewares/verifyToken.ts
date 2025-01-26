import jwt, { type VerifyErrors } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

import config from 'src/config'
import UserModel from '@users/models/User.model'

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { token } = req.headers

  if (token === undefined) res.status(400).json({ success: false, data: { message: 'token not found' } })

  //if (!token) {
  //  res.status(400).json({ success: false, data: { message: 'token not found' } })
  //  return
  //}

  const secretToken = config.secretToken

  //if (secretToken === undefined) return res.status(500).json({ success: false, data: { message: 'secret token not found' } })
  if (!secretToken) {
    res.status(500).json({ success: false, data: { message: 'secret token not found' } })
    return
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token as string, secretToken, async (error: VerifyErrors | null, payload: any) => {
      if (error !== null) {
        res.status(400).json({ success: false, data: { message: 'invalid token' } })
      }

      //const userFound = await UserModel.findById(payload?.id)
      //if (userFound === null) res.status(400).json({ success: false, data: { message: 'user not found' } })

      req.user = payload
      next()
    })
  } catch (error) {
    res.status(500).json({ success: false, data: { message: error } })
  }
}
