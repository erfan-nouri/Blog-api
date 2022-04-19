import { Request, Response } from "express";
import userModel from './model/user'

export default class userController {

          public async usersList(req: Request, res: Response) {
                    const users = await userModel.find();
                    res.send(users)
          }
}