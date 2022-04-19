import { Schema, model } from "mongoose";
import IUser from "./IUser";
import userRole from "./userRole";
import { hash } from '../../../services/hashService'


const userSchema: Schema = new Schema({

          firstName: { type: String, required: true, minlength: 5, maxlength: 255, trim: true },
          lastName: { type: String, required: true, minlength: 5, mamaxlengthx: 255, trim: true },
          email: { type: String, required: true, trim: true },
          mobile: { type: Number, required: true, minlength: 10, maxlength: 11, trim: true },
          password: { type: String, required: true, minlength: 8, maxlength: 255, trim: true },
          role: { type: Number, default: userRole.AUTHOR },
          created_at: { type: Date, default: Date.now() }
})

userSchema.pre('save', function (next) {
          try {
                    this.password = hash(this.password)
                    next()
          } catch (error) {
                    next(error)
          }
})


export default model<IUser>('users', userSchema)