import { Application } from "express";
import * as bodyparser from 'body-parser'
import * as cors from 'cors'
export default function bootstrap(app: Application) {
          app.use(cors())
          app.use(bodyparser.json())
          app.use(bodyparser.urlencoded({ extended: false }))

}