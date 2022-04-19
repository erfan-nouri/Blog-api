import postModel from "../model/post";
import { Request, Response, NextFunction } from "express";

export default class postController {

          public async postsList(req: Request, res: Response, next: NextFunction) {
                    try {

                              const posts = await postModel.find({ status: 0 }).populate({ path: 'author', select: { 'firstName': 1, 'lastName': 1 } })

                              if (posts) {
                                        return res.status(200).send({
                                                  success: true,
                                                  statusCode: 200,
                                                  message: 'get all posts successfuly',
                                                  data: posts
                                        })
                              }

                              return res.status(404).send({
                                        success: false,
                                        statusCode: 400,
                                        message: 'get all posts failed'
                              })
                    } catch (error) {
                              next(error)
                    }
          }

          public async singlePost(req: Request, res: Response, next: NextFunction) {
                    try {

                              const postData = await postModel.findOne({ _id: req.params.postid }).populate({ path: 'author', select: { 'firstName': 1, 'lastName': 1 } });

                              if (postData) {
                                        return res.status(200).send({
                                                  success: true,
                                                  message: 'get post successfuly',
                                                  statusCode: 200,
                                                  data: postData
                                        })
                              }
                              return res.status(404).send({
                                        success: false,
                                        message: 'get post failed',
                                        statusCode: 404
                              })
                    } catch (error) {
                              next(error)
                    }
          }

}