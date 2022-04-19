import { verify } from "../services/tokenService";
import { Request, Response, NextFunction } from "express"

export const auth = (req: Request, res: Response, next: NextFunction) => {
          try {
                    const token = req.headers.authorization

                    if (!token) {
                              const error = new Error();
                              error.message = 'You do not have token.please login into your account.'
                              error.statusCode = 401;
                              throw error
                    }

                    const verifyResult = verify(token as string)

                    if (!verifyResult) {
                              const error = new Error();
                              error.message = 'Your token is invalid.'
                              error.statusCode = 401;
                              throw error
                    }
                    next();

          } catch (error) {
                    next(error)
          }
}

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
          try {
                    const token = req.headers.authorization

                    if (!token) {
                              const error = new Error();
                              error.message = 'You do not have token.please login into your account.'
                              error.statusCode = 401;
                              throw error
                    }

                    const verifyResult = verify(token as string)

                    if (!verifyResult) {
                              const error = new Error();
                              error.message = 'Your token is invalid.'
                              error.statusCode = 401;
                              throw error
                    }

                    const userRole: number = verifyResult.role;
                    if (userRole != 1) {
                              const error = new Error();
                              error.message = 'You do not have authorized access to this section.'
                              error.statusCode = 401;
                              throw error
                    }

                    next();

          } catch (error) {
                    next(error)
          }
}

export const loginCheck = (req: Request, res: Response, next: NextFunction) => {
          try {
                    const token = req.headers.authorization
                    const verifyResult = verify(token as string)

                    if (token && verifyResult) {
                              const error = new Error();
                              error.message = 'you are logged in.'
                              error.statusCode = 302;
                              throw error
                    }
                    next();

          } catch (error) {
                    next(error)
          }
}