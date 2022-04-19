import { Request, Response, NextFunction } from "express";
import { sign } from '../../services/tokenService'
import userModel from '../user/model/user'
import { registerValidator } from "../../services/validatorService";
import { compare } from "../../services/hashService";
export default class authController {


          public async login(req: Request, res: Response, next: NextFunction) {
                    try {

                              const { email, password } = req.body
                              const userData = await userModel.findOne({ email })

                              const comparePassword = compare(password, userData.password)

                              if (comparePassword) {
                                        const token = sign({ id: userData._id, email, role: userData.role })
                                        return res.status(200).send({
                                                  success: true,
                                                  message: "login successfuly",
                                                  statusCode: 200,
                                                  token
                                        })
                              }

                              return res.status(404).send({
                                        success: false,
                                        message: "login failed",
                                        statusCode: 404
                              })
                    } catch (error) {
                              next(error)
                    }
          }


          public async register(req: Request, res: Response, next: NextFunction) {
                    try {
                              
                    const { firstName, lastName, mobile, email, password, confirm_password } = req.body;
                    const userData: object = {
                              firstName,
                              lastName,
                              email,
                              mobile,
                              password,
                              confirm_password
                    }

                    const user = await userModel.findOne({ email })
                    if (user) {
                              return res.status(406).send({
                                        success: false,
                                        message: "A user has already registered with this email.",
                                        statusCode: 406
                              })
                    }

                    const validateResult = await registerValidator(userData)
                    if (validateResult.length == 0) {
                              await userModel.create(userData)
                              return res.status(201).send({
                                        success: true,
                                        message: "register succesfuly",
                                        statusCode: 201
                              })
                    }

                    return res.status(406).send({
                              success: false,
                              message: "error in input data",
                              statusCode: 406,
                              errors: validateResult
                    })
                    } catch (error) {
                              next(error)
                    }
          }
}