import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction, Router } from 'express'

export class VideoContentRoutes {
  public static path = '/'
  private static instance: VideoContentRoutes
  private router = Router()
  private prisma = new PrismaClient()
  private constructor() {
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      next()
    })
    this.router.get('/videos', this.getProfiles)
    this.router.get('/videos/:id', this.getVideoContent)
    this.router.post('/videos', this.createVideo)
    this.router.put('/videos/:id', this.updateVideo)
    this.router.delete('/videos/:id', this.deleteVideo)
  }
  private getProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const videoProfiles = await this.prisma.video_block.findMany()
      if (!videoProfiles) {
        res.status(404).send({ message: '找不到影片' })
      }
      res.status(200).send(videoProfiles)
    } catch (error) {
      next(error)
      res.status(500).json({ error: '載入影片失敗' })
    }
  }
  private getVideoContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id: any = Number(req.params.id)
      const videoContent = await this.prisma.video_block_content.findFirst({
        where: { id }
      })
      const videoProfile = await this.prisma.video_block.findFirst({
        where: { id },
        select: { poster: true }
      })
      if (!videoContent) {
        res.status(404).send({ message: '找不到該影片' })
        return
      }
      res.status(200).send({
        id: videoContent.id,
        video_url: videoContent.video_url,
        title: videoContent.title,
        content: videoContent.content,
        profile_image: videoProfile?.poster
      })
    } catch (error) {
      next(error)
      res.status(500).json({ error: '載入影片失敗' })
    }
  }
  private createVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { video_url, content, title } = req.body
      // for (let i = 0; i < video_url?.length; i++) {

      // }
      const regex =
        /^https?:\/\/(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})$/
      const videoKey = video_url.split('/')[4]
      if (!video_url.match(regex) || !videoKey) {
        res.status(400).send({ message: '請輸入正確的影片連結' })
        return
      }
      const poster = `https://img.youtube.com/vi/${videoKey}/0.jpg`
      const profile = await this.prisma.video_block.findUnique({
        where: {
          title
        }
      })
      if (profile) {
        res.status(400).send({ message: '找不到此影片' })
        return
      }
      if (!title || !video_url || video_url.length === 0) {
        res.status(400).send({ message: '影片連結和標題不能為空白' })
        return
      }
      const videoCreate = await this.prisma.video_block.create({
        data: {
          poster,
          title,
          video_block_content: {
            create: {
              ...(content ? { content } : {}),
              video_url: [video_url],
              title
            }
          }
        }
      })
      res.status(201).send(videoCreate)
    } catch (error) {
      next(error)
      res.status(500).json({ error: '無法新增影片' })
    }
  }
  private updateVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id: any = Number(req.params.id)
    try {
      const { video_url, content, title } = req.body
      const videoKey = video_url?.split('/')[4]
      if (!videoKey) {
        res.status(400).send({ message: '請輸入正確的影片連結' })
        return
      }
      const poster = `https://img.youtube.com/vi/${videoKey}/0.jpg`
      const profile = await this.prisma.video_block.findUnique({
        where: {
          id
        }
      })
      if (!profile) {
        res.status(400).send({ message: '這個影片不存在' })
        return
      }
      const videoUpdate = await this.prisma.video_block.update({
        where: { id: profile.id },
        data: {
          ...(title ? { title } : {}),
          ...(poster ? { poster } : {}),
          video_block_content: {
            update: {
              where: { id: profile.id },
              data: {
                ...(video_url ? { video_url } : {}),
                ...(content ? { content } : {}),
                ...(title ? { title } : {})
              }
            }
          }
        }
      })
      res.status(202).send(videoUpdate)
    } catch (error) {
      next(error)
    }
  }
  private deleteVideo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id: any = Number(req.params.id)
    try {
      const profile = await this.prisma.video_block.findUnique({
        where: {
          id
        }
      })
      if (!profile) {
        res.status(400).send({ message: '這個影片不存在' })
        return
      }
      const deleteVideo = await this.prisma.video_block.delete({
        where: { id: profile?.id }
      })
      res.status(204).send({ deleteVideo })
    } catch (error) {
      next(error)
    }
  }
  static get router(): Router {
    if (!VideoContentRoutes.instance) {
      VideoContentRoutes.instance = new VideoContentRoutes()
    }
    return VideoContentRoutes.instance.router
  }
}
