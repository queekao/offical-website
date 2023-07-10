import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction, Router } from 'express'
import { getImageUrl } from '../../services'
export class BasicContentRoutes {
  public static path = '/'
  private static instance: BasicContentRoutes
  private table = ''
  private router = Router()
  private prisma = new PrismaClient() as any
  private constructor() {
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      // check the path before route
      // const id: any = Number(req.path.split('/')[2])
      if (req.path === '/about') {
        this.table = 'about'
      } else if (req.path === '/feedback') {
        this.table = 'feedback'
      } else if (req.path === '/service') {
        this.table = 'service'
      }
      next()
    })
    this.router.get(['/about', '/feedback', '/service'], this.getPopupContent)
    this.router.put(
      ['/about', '/feedback', '/service'],
      this.updatePopupContent
    )
    this.router.delete(
      ['/about', '/feedback', '/service'],
      this.deletePopupContent
    )
  }
  private getPopupContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const basicContent = await this.prisma[this.table].findFirst()
      const content = await this.prisma[this.table].findFirst({
        select: { card: true }
      })
      const cards = await Promise.all(
        content?.card.map((card: any) => {
          if (!card.image) {
            return {
              id: card.id,
              content: card.content
            }
          } else {
            return getImageUrl(card?.image).then(cardSvg => {
              return {
                id: card.id,
                content: card.content,
                image: cardSvg
              }
            })
          }
        }) as Array<object>
      )
      // res.setHeader('Cache-Control', 'public, max-age=3600') // Set cache for 1 hour
      res.status(200).send({
        title: basicContent?.title,
        video_url: basicContent?.video_url,
        cards
      })
    } catch (error) {
      next(error)
      res.status(500).json({ message: '取得資料失敗' })
    }
  }
  private updatePopupContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { title, video_url } = req.body
      if (!title) {
        res.status(400).send({ message: '標題不能空白' })
        return
      }
      if (this.table !== 'about') video_url === ''
      const findId = await this.prisma[this.table].findFirst({
        select: { id: true }
      })
      const updateBasicContent = await this.prisma[this.table].update({
        where: { id: findId?.id },
        data: {
          ...(title ? { title } : {}),
          ...(video_url ? { video_url } : {})
        }
      })
      res.status(202).send(updateBasicContent)
    } catch (error) {
      next(error)
      res.status(500).json({ message: '修改失敗' })
    }
  }
  private deletePopupContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      console.log(req.body)
      res.status(204).send('haha bitch')
    } catch (error) {
      next(error)
      res.status(500).json({ message: '刪除失敗' })
    }
  }
  static get router(): Router {
    if (!BasicContentRoutes.instance) {
      BasicContentRoutes.instance = new BasicContentRoutes()
    }
    return BasicContentRoutes.instance.router
  }
}
