import { Application } from "express";
import exceptionHandler from './exceptionHandler'
export default function (app: Application) {
          exceptionHandler(app)
}