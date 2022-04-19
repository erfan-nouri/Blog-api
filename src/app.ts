import * as express from "express";
import { Application } from "express";
import routeService from '../src/router/routeService'
import boot from '../src/boot/index'
import middlewares from "./middlewares/index";

export default class app {
          private app: Application;
          private port: Number
          private router: routeService

          constructor(Port: Number) {
                    this.port = Port
                    this.app = express();
                    this.router = new routeService(this.app)
          }

          public start() {
                    boot(this.app)
                    this.router.run()
                    middlewares(this.app)
                    this.app.listen(this.port || 3001, () => {
                              console.log(`app is running on port ${this.port || 3001}`);
                    })
          }
}