import { Application, Request, Response, NextFunction } from "express";

export default function (app: Application) {
          app.use((error, req: Request, res: Response, next: NextFunction) => {
                    const statusCode = error.statusCode || 500
                    res.status(statusCode).send({
                              status: statusCode,
                              message: error.message
                    })
          })
}