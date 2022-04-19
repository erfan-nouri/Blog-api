import app from './app'
import { config } from 'dotenv'
import  startMongoose  from '../infrastructure/connections/mongoose'
config();

startMongoose();
const App = new app(process.env.APP_PORT as unknown as number)
App.start()