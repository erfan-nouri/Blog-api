import { Router } from "express";
import postController from './postController'
import { adminAuth } from '../../../middlewares/auth'
const postsController = new postController()
const postRouter: Router = Router();

postRouter.use(adminAuth)
postRouter.get('/', postsController.postsList)
postRouter.delete('/:postid', postsController.deletePost)
postRouter.patch('/postid', postsController.editPost)


export default postRouter