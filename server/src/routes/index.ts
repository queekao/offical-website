import { Request, Response, Router } from 'express'
import { authRoutes } from './auth'
import { imageContentRoutes, VideoContentRoutes } from './release_content'
import { QnARoutes } from './QnA_content'
import { ContactRoutes } from './contact'
import { CardRoutes, BasicContentRoutes } from './basic_content'
// import { Server } from '../server'
// Server.getBucket('')
export class ApiRoutes {
  public static path = '/api/v1'
  private static instance: ApiRoutes
  private router = Router()
  private constructor() {
    this.router.get('/', this.get)
    this.router.use(authRoutes.path, authRoutes.router)
    this.router.use(imageContentRoutes.path, imageContentRoutes.router)
    this.router.use(VideoContentRoutes.path, VideoContentRoutes.router)
    this.router.use(QnARoutes.path, QnARoutes.router)
    this.router.use(ContactRoutes.path, ContactRoutes.router)
    this.router.use(CardRoutes.path, CardRoutes.router)
    this.router.use(BasicContentRoutes.path, BasicContentRoutes.router)
  }

  static get router(): Router {
    if (!ApiRoutes.instance) {
      ApiRoutes.instance = new ApiRoutes()
    }
    return ApiRoutes.instance.router
  }

  private get = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({ online: true })
  }
}
