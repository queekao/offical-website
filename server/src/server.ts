import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { ApiRoutes } from './routes'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import errorHandler from 'errorhandler'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { options } from './models'
import cookieParser from 'cookie-parser'

dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod'
})
const swaggerSpec = swaggerJsDoc(options)

export class Server {
  public static bootstrap(): Server {
    return new Server()
  }

  public app: express.Application

  constructor() {
    // create expressjs application
    this.app = express()
    // configure application
    this.config()

    // add routes
    this.routes()
  }

  public config(): void {
    // add static paths
    this.app.use(
      cors({
        origin: [`${process.env.CLIENT}`, `${process.env.ADMIN}`],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
      })
    )
    this.app.use(helmet())
    this.app.use(bodyParser.json({ limit: '50mb' }))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(cookieParser())

    this.app.use(morgan('dev'))
    const limiter = rateLimit({
      max: 100,
      windowMs: 60 * 60 * 1000,
      message: 'Too many requests from this IP, please try again in an hour!'
    })
    this.app.use('/api', limiter)
    // this.app.all('*', (req, res, next) => {
    //   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
    // })
    // error handling
    this.app.use(errorHandler({ log: true }))
  }

  private routes(): void {
    // use router middleware
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

    /**
     * @swagger
     * /news:
     *  get:
     *  description: use to request all customers
     *  responses:
     *    '200':
     *
     */
    this.app.use(ApiRoutes.path, ApiRoutes.router)
  }
}
