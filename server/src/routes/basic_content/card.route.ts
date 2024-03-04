import { PrismaClient } from '@prisma/client'
import { Express, Request, Response, NextFunction, Router } from 'express'
import { deleteOneObject, uploadWithPath } from '../../services'
import multer from 'multer'
export class CardRoutes {
  public static path = '/'
  private static instance: CardRoutes
  private table = ''
  private imagePath = 'umbrella/iconAndTestimonial/'
  private upload: any
  private router = Router()
  private prisma = new PrismaClient() as any
  private constructor() {
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      // check the path before route
      // const id: any = Number(req.path.split('/')[3])
      if (req.path === '/card/about') {
        this.table = 'about'
      } else if (req.path === '/card/feedback') {
        this.table = 'feedback'
      } else if (req.path === '/card/service') {
        this.table = 'service'
      }
      this.upload = uploadWithPath(this.imagePath, '').single('image')
      next()
    })
    this.router.post(
      ['/card/about', '/card/feedback', '/card/service'],
      this.createCard
    )
    this.router.put('/card/:id', this.updateCard)
    this.router.delete('/card/:id', this.deleteCard)
  }
  private createCard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.upload(req, res, async (err: multer.MulterError) => {
        const { content } = req.body
        if (!content) {
          res.status(400).send({ message: '內容必須包含' })
          return
        }
        const card = await this.prisma.card.findFirst({
          where: {
            content
          }
        })
        if (card) {
          res.status(400).send({ message: '已有此卡片' })
          return
        }
        if (err instanceof multer.MulterError) {
          res.status(413).send(err)
          return
        } else if (err) {
          // An unknown error occurred when uploading.
          res.status(400).send(err)
          return
        }
        const uploadImage = (req.file as Express.MulterS3.File)?.key
        const uniqueContent = await this.prisma[this.table].findFirst({
          select: { id: true }
        })
        const createCard = await this.prisma.card.create({
          data: {
            content,
            image: uploadImage,
            [this.table]: {
              connect: { id: uniqueContent?.id }
            }
          }
        })

        res.status(201).send(createCard)
      })
    } catch (error) {
      next(error)
      res.status(500).json({ message: '失敗創建卡片' })
    }
  }
  private updateCard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id: any = Number(req.params.id)
      this.upload(req, res, async (err: multer.MulterError) => {
        const { content } = req.body
        if (err instanceof multer.MulterError) {
          res.status(413).send(err)
          return
        } else if (err) {
          // An unknown error occurred when uploading.
          res.status(400).send(err)
          return
        }
        const updateImage = (req.file as Express.MulterS3.File)?.key
        const card = await this.prisma.card.findFirst({
          where: {
            id
          }
        })
        if (!card) {
          res.status(404).send({ message: '卡片不存在' })
          return
        }
        if (updateImage) {
          await deleteOneObject(card.image)
        }

        const updateCard = await this.prisma.card.update({
          where: { id: card.id },
          data: {
            ...(content ? { content } : {}),
            ...(updateImage && { image: updateImage })
          }
        })
        res.status(202).send(updateCard)
      })
    } catch (error) {
      next(error)
      res.status(500).json({ message: '修改卡片失敗' })
    }
  }
  private deleteCard = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id: any = Number(req.params.id)
    try {
      const card = await this.prisma.card.findFirst({
        where: {
          id
        }
      })
      if (!card) {
        res.status(404).send({ message: '卡片不存在' })
        return
      }
      const deleteCard = await this.prisma.card.delete({
        where: { id: card?.id }
      })
      await deleteOneObject(deleteCard.image || '')
      res.status(204).send(deleteCard)
    } catch (error) {
      next(error)
      res.status(500).json({ message: '刪除卡片失敗' })
    }
  }
  static get router(): Router {
    if (!CardRoutes.instance) {
      CardRoutes.instance = new CardRoutes()
    }
    return CardRoutes.instance.router
  }
}
