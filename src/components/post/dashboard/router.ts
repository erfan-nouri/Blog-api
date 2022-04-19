import { Router } from "express";
import { auth } from "../../../middlewares/auth";
import postController from './postController'
const postsController = new postController()
const postRouter: Router = Router();

postRouter.use(auth)
postRouter.get('/', postsController.usersPosts)
postRouter.delete('/:postid', postsController.deletePost)
postRouter.patch('/:postid', postsController.editPost)
postRouter.post('/', postsController.createPost)
postRouter.get('/publish/:postid', postsController.publishPost)

export default postRouter