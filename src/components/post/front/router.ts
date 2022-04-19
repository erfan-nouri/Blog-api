import { Router } from "express";
import postController from './postController'

const postsController = new postController()
const postRouter: Router = Router();

postRouter.get('/', postsController.postsList)
postRouter.get('/:postid', postsController.singlePost)


export default postRouter