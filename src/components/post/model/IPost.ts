import { Document } from 'mongoose'
import postStatus from './postStatus'
export default interface IPost extends Document {

          title: String,
          slug: String,
          category: String,
          thumbnail: string,
          text: string,
          author: string
          status: postStatus
          created_at : Date
          updated_at:Date

}