import { CustomError } from '@utils/errors'
import jwt from 'jsonwebtoken'
import { token } from 'morgan'
import config from 'src/config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createAccessToken(payload: string | object | Buffer): Promise<any> {
  const secretToken = config.secretToken

  if (typeof secretToken !== 'string') throw new CustomError({ message: 'Secret Token no es una cadena', status: 500 })

  return await new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.sign(payload, secretToken, (err: any, token: any) => {
      if (err !== null) reject(err)
      resolve(token)
    })
  })
}

createAccessToken({ id: '111', role: 'ADMINISTRATOR' }).then((token) => {
  console.log('🚀 ~ file: jwt.ts:11 ~ createManualToken ~ token:', token)
})
