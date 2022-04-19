import { Router } from "express";
import { loginCheck } from "../../middlewares/auth";
import controller from './authController'
const authController: controller = new controller();

const authRouter:Router = Router();

authRouter.use(loginCheck)
authRouter.post('/login', authController.login)
authRouter.post('/register' , authController.register)

export default authRouter