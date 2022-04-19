import { model, Schema } from 'mongoose'
import IPost from './IPost'
import postStatus from './postStatus'

const postSchema: Schema = new Schema({
          title: { type: String, required: true, minlength: 5, maxlength: 150, trim: true },
          slug: { type: String, required: true, minlength: 3, maxlength: 100, trim: true },
          category: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
          thumbnail: { type: String, required: true, },
          text: { type: String, minlength: 20, required: true, trim: true },
          author: { type: Schema.Types.ObjectId, ref: 'users', required: true },
          status: { type: Number, default: postStatus.DRAFT, required: true },
          created_at: { type: Date, default: Date.now() },
          updated_at: { type: Date, default: Date.now() },
})

export default model<IPost>('posts', postSchema)