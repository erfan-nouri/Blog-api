import { Application, Router } from "express";

import routerEngine from "./router";
import userRouter from '../components/user/router'
import frontPostRouter from '../components/post/front/router'
import adminFrontRouter from '../components/post/admin/router'
import dashboardPostRouter from '../components/post/dashboard/router'
import authRouter from '../components/auth/router'

export default class routerService {

          private app: Application;
          private router: routerEngine;
          constructor(app: Application) {
                    this.router = new routerEngine();
                    this.app = app;
                    this.bindRouter();
          }

          public bindRouter() {

                    //admin
                    this.router.registerRouter('/api/v1/admin/users', userRouter)
                    this.router.registerRouter('/api/v1/admin/posts', adminFrontRouter)


                    //front
                    this.router.registerRouter('/api/v1/posts', frontPostRouter)
                    this.router.registerRouter('/api/v1/auth', authRouter)


                    //dashboard
                    this.router.registerRouter('/api/v1/dashboard/posts',  dashboardPostRouter)

          }

          public run() {

                    this.router.getRouter().forEach((router: Router, route: string) => {
                              this.app.use(route, router)
                    })
          }
}