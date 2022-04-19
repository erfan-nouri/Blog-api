import postModel from "../model/post";
import { Request, Response, NextFunction } from "express";
import { verify } from "../../../services/tokenService";
import { postValidator } from "../../../services/validatorService";

export default class postController {


          public async usersPosts(req: Request, res: Response, next: NextFunction) {
                    try {

                              const { id } = verify(req.headers.authorization as string)

                              const usersPosts = await postModel.find({ author: id }).populate({ path: 'author' })

                              if (usersPosts) {
                                        return res.status(200).send({
                                                  success: true,
                                                  message: 'Posts found successfully.',
                                                  statusCode: 200,
                                                  data: usersPosts
                                        })
                              }
                              return res.status(404).send({
                                        success: false,
                                        message: 'Posts not found.',
                                        statusCode: 404
                              })
                    } catch (error) {
                              next(error)
                    }
          }

          public async deletePost(req: Request, res: Response, next: NextFunction) {
                    try {

                              const { id } = verify(req.headers.authorization as string)
                              const deleteResult = await postModel.findOneAndDelete({ _id: req.params.postid, author: id })

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

                              const { id } = verify(req.headers.authorization as string)

                              const editResult = await postModel.findOneAndUpdate({ _id: req.params.postid, author: id }, req.body)

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

          public async createPost(req: Request, res: Response, next: NextFunction) {
                    try {

                              const { title, slug, category, thumbnail, text, status } = req.body
                              const { id } = verify(req.headers.authorization as string)
                              const author = id

                              const validatorResult = await postValidator({
                                        title,
                                        slug,
                                        category,
                                        thumbnail,
                                        text,
                                        author,
                                        status
                              })

                              if (validatorResult.length == 0) {
                                        const createResult = await postModel.create({ title, slug, category, thumbnail, text, status, author })

                                        if (createResult) {

                                                  return res.status(200).send({
                                                            success: true,
                                                            message: 'Post created successfully.',
                                                            statusCode: 200
                                                  })
                                        }

                                        return res.status(404).send({
                                                  success: false,
                                                  message: 'The post could not be created successfully.',
                                                  statusCode: 404
                                        })
                              }

                              return res.status(400).send({
                                        success: false,
                                        statusCode: 400,
                                        message: validatorResult
                              })
                    } catch (error) {
                              next(error)
                    }
          }

          public async publishPost(req: Request, res: Response, next: NextFunction) {
                    try {

                              const { id } = verify(req.headers.authorization as string)

                              const publishResult = await postModel.findOneAndUpdate({ _id: req.params.postid, author: id }, { status: 0 })

                              if (publishResult) {
                                        return res.status(200).send({
                                                  success: true,
                                                  message: 'Post published.',
                                                  statusCode: 200
                                        })
                              }

                              return res.status(400).send({
                                        success: false,
                                        statusCode: 400,
                                        message: "There was a problem publishing the post."
                              })
                    } catch (error) {
                              next(error)
                    }
          }
}