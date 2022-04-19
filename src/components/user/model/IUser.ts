import { Document } from 'mongoose'
import userRole from './userRole'

export default interface IUser extends Document {

          firstName: string
          lastName: string
          email: string
          mobile: string
          password: string
          role:userRole
          created_at: Date

}