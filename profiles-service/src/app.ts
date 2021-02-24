import express, { Express } from 'express'
import { mongooseConnection } from './utils/util.connection'
import { routeMiddleware } from './middlewares/middleware.route'
import { pluginMiddleware } from './middlewares/middleware.plugin'

const app = express() as Express

mongooseConnection()
pluginMiddleware(app)
routeMiddleware(app)

export default app
