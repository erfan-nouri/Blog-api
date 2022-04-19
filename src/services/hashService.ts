import * as bcrypt from 'bcrypt'


export const hash =  (plainPassword: string) => {

          return  bcrypt.hashSync(plainPassword, 10)

}

export const compare =  (plainPassword: string, hashedPassword: string) => {

          return  bcrypt.compareSync(plainPassword, hashedPassword)
          
}