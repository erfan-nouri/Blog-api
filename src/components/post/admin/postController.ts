import postModel from "../model/post";
import { Request, Response, NextFunction } from "express";

export default class postController {

          public async postsList(req: Request, res: Response, next: NextFunction) {
                    try {
                              const posts = await postModel.find().populate({ path: 'author' })

                              if (posts) {
                                        return res.status(200).send({
                                                  success: true,
                                                  message: 'get all posts successfully..',
                                                  statusCode: 200,
                                                  data: posts
                                        })
                              }

                              return res.status(404).send({
                                        success: false,
                                        message: 'get all posts failed..',
                                        statusCode: 404
                              })
                    } catch (error) {
                              next(error)
                    }

          }
          public async deletePost(req: Request, res: Response, next: NextFunction) {
                    try {

                              const deleteResult = await postModel.findByIdAndDelete(req.params.postid)

                              if (deleteResult) {
                                        return res.status(200).send({
                                                  success: true,
                                                  message: 'Post deleted successfully..',
                                                  statusCode: 200
                                        })
                              }

                              return res.status(404).send({
                                        success: false,
                                        message: 'The post could not be deleted successfully.',
                                        statusCode: 404
                              })
                    } catch (error) {
                              next(error)
                    }
          }
          public async editPost(req: Request, res: Response, next: NextFunction) {
                    try {

                              const editResult = await postModel.findOneAndUpdate({ _id: req.params.postid }, req.body)

                              if (editResult) {
                                        return res.status(200).send({
                                                  success: true,
                                                  message: 'The post was successfully edited.',
                                                  statusCode: 200
                                        })
                              }

                              return res.status(404).send({
                                        success: false,
                                        message: 'The post could not be updated successfully.',
                                        statusCode: 404
                              })
                    } catch (error) {
                              next(error)
                    }
          }
}