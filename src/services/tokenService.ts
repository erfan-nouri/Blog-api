import * as JWT from 'jsonwebtoken'


export const sign = (data: any, expiresIn:string = '1h') => {

          return JWT.sign(data, process.env.JWT_SECRET as string, { expiresIn })

}

export const verify = (token: string) => {
          try {
                    return JWT.verify(token, process.env.JWT_SECRET as string)
          } catch (error) {
                    return false
          }
}