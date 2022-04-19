import { Router } from "express";
import userController from './userController'
const usersController = new userController()
const userRouter: Router = Router();


userRouter.get('/', usersController.usersList)

export default userRouter

