import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction, Router } from 'express'
import {
  deleteOneObject,
  getImageUrl,
  getImagesFromS3,
  pushAndDeleteImage,
  uploadWithPath
} from '../../services'
import multer from 'multer'
/**
 * Represents a book.
 * @param {path} string the path add to /api/v1
 * @param {instance} Router export route
 * @table the upload desirable table we have 3 table link to 1 table here
 * @tableKey the foregin key to link the the "content" table
 * @profileImage profile image of 3 table except the content table image
 * @contentImages content table image
 * @upload s3 uploader
 */
/**
 * Checks if a key exists in the cache.
 * @param {string} key - The key to check in the cache.
 * @returns {boolean} True if the key exists in the cache, false otherwise.
 */
export class imageContentRoutes {
  public static path = '/'
  private static instance: imageContentRoutes
  private table = ''
  private tableKey = ''
  private profileImage = 'umbrella/treeman_profile/'
  private contentImages = 'umbrella/treeman_content/'
  private upload: any
  private router = Router()
  private prisma = new PrismaClient() as any
  private constructor() {
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      // check the path before route
      const { id } = req.body

      const numberId: any = Number(id ? id : req.path.split('/')[2])

      if (req.path === '/treemans') {
        this.table = 'treeman_block'
      } else if (req.path === '/richs') {
        this.table = 'rich_block'
      } else if (req.path === '/news') {
        this.table = 'news'
      } else if (req.path === `/treemans/${numberId}`) {
        this.profileImage = 'umbrella/treeman_profile/'
        this.contentImages = `umbrella/treeman_content/${numberId}/`
        this.table = 'treeman_block'
        this.tableKey = 'treemanTitle'
      } else if (req.path === `/richs/${numberId}`) {
        this.profileImage = 'umbrella/rich_profile/'
        this.contentImages = `umbrella/rich_content/${numberId}/`
        this.table = 'rich_block'
        this.tableKey = 'richTitle'
      } else if (req.path === `/news/${numberId}`) {
        this.profileImage = 'umbrella/news_profile/'
        this.contentImages = `umbrella/new_content/${numberId}/`
        this.table = 'news'
        this.tableKey = 'newsTitle'
      }
      this.upload = uploadWithPath(
        this.profileImage,
        this.contentImages
      ).fields([
        {
          name: 'image',
          maxCount: 1
        },
        {
          name: 'multiImage',
          maxCount: 30
        }
      ])
      next()
    })
    this.router.get(['/treemans', '/richs', '/news'], this.getProfiles)
    this.router.get(
      ['/treemans/:id', '/richs/:id', '/news/:id'],
      this.getContent
    )
    this.router.post(['/treemans', '/richs', '/news'], this.createContent)
    this.router.put(
      ['/treemans/:id', '/richs/:id', '/news/:id'],
      this.updateContent
    )
    this.router.delete(
      ['/treemans/:id', '/richs/:id', '/news/:id'],
      this.deleteContent
    )
  }
  private getProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const page = (Number(req.query.page) - 1) * 6
    if (page < 0) {
      res.status(400).json({ message: '頁面不能為0' })
      return
    }
    try {
      const content = await this.prisma[this.table].findMany({
        select: { id: true, title: true, created_at: true },
        take: page >= 0 ? 6 : 10000,
        skip: page >= 0 ? page : 0
      })
      const images = await this.prisma[this.table].findMany({
        select: { image: true }
      })
      const response = []

      for (let i = 0; i < content.length; i++) {
        const imageUrl = await getImagesFromS3(images)
        response.push(Object.assign(content[i], { image: imageUrl[i] }))
      }
      // res.setHeader('Content-Range', `posts 0-${content.length}/${page}`)
      res.status(200).json(response)
    } catch (error) {
      console.error('Error getting content:', error)
      res.status(500).json({ error: '取得不到資料' })
      next(error)
    }
  }
  private getContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id: any = Number(req.params.id)
    try {
      const profile = await this.prisma[this.table].findFirst({
        where: {
          id: id
        },
        select: { title: true, image: true }
      })
      const image = await getImageUrl(profile.image)

      const target = await this.prisma.content.findFirst({
        where: { [this.tableKey]: profile.title }
        // select: { content: true, title: true, image: true }
      })

      const images = await getImagesFromS3(target)
      if (!target) {
        res.status(404).json({ message: '找不到資料' })
      } else {
        res.status(200).send({
          id: target.id,
          profile_image: image,
          content: target.content,
          title: target.title,
          images
        })
      }
    } catch (error) {
      console.error('Error getting content:', error)
      res.status(500).json({ error: '取得不到資料' })
      next(error)
    }
  }
  private createContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.upload(req, res, async (err: multer.MulterError) => {
        const { title, content, id } = req.body
        const numberId: any = Number(id)
        const profile = await this.prisma[this.table].findUnique({
          where: {
            id: numberId
          }
        })
        if (profile) {
          res.status(400).send({ message: '這個編號已存在' })
          return
        }
        if (!title || !content) {
          res.status(400).send({ message: '標題和內容不得為空白' })
          return
        }
        const profileImage = (req?.files as any)?.['image'][0].key
        // the contentImage is optional
        const contentImage =
          (req?.files as any)?.['multiImage']?.map(
            (images: any) => images.key
          ) || ''
        if (!profileImage) {
          res.status(400).send({ message: '你必須要上傳封面照' })
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

        const createData = await this.prisma[this.table].create({
          data: {
            id: numberId,
            title,
            image: profileImage || '',
            content: { create: [{ title, image: [...contentImage], content }] }
          }
        })

        res.status(201).send(createData)
        next()
      })
    } catch (error) {
      next(error)
      res.status(500).json({ error: '上傳失敗' })
    }
  }
  private updateContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id: any = Number(req.params.id) // this id is the profile id
    const profile = await this.prisma[this.table].findUnique({
      where: {
        id
      }
    })
    if (!profile) {
      res.status(404).send({ message: '這個選項不存在' })
      return
    }
    try {
      this.upload(req, res, async (err: multer.MulterError) => {
        let profileImage: any
        let contentImage: any
        const uniqueProfile = await this.prisma[this.table].findUniqueOrThrow({
          where: {
            id
          },
          select: {
            image: true,
            title: true
          }
        })
        const deleteContent = await this.prisma.content.findFirst({
          where: {
            title: uniqueProfile.title
          }
        })
        if ((req?.files as any)?.['image']) {
          // ❌ do not upload the same image name
          profileImage = (req.files as any)['image'][0]?.key
          await deleteOneObject(uniqueProfile.image)
        }
        if ((req?.files as any)?.['multiImage']) {
          contentImage =
            (req.files as any)['multiImage']?.map(
              (images: any) => images.key
            ) || ''
          if (deleteContent?.image)
            if ((deleteContent?.image as Array<string>).length !== 0) {
              // ❌ do not upload the same folder
              await pushAndDeleteImage('', deleteContent?.image as string[])
            }
        }
        const { title, content } = req.body
        if (err instanceof multer.MulterError) {
          res.status(413).send(err)
        } else if (err) {
          res.status(400).send(err)
        }

        const updateTitle = await this.prisma[this.table].update({
          where: { title: uniqueProfile.title },
          data: {
            ...(title ? { title } : {}),
            ...(profileImage && { image: profileImage })
          }
        })
        const updateContent = await this.prisma.content.update({
          where: {
            title: uniqueProfile.title
          } as Prisma.contentWhereUniqueInput,
          data: {
            ...(title ? { title } : {}),
            ...(content ? { content } : {}),
            ...(contentImage && { image: [...contentImage] }) // if there is a value update
          }
        })
        res.status(202).send({
          message: '修改成功',
          data: Object.assign(updateTitle, updateContent)
        })
      })
    } catch (error) {
      next(error)
      res.status(500).json({ error: '修改失敗' })
    }
  }
  private deleteContent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id: any = Number(req.params.id)
    try {
      await this.deleteAllImage(id)
      const removeData = await this.prisma[this.table].delete({
        where: { id }
      })
      if (!removeData) {
        res.status(404).json({ message: '找不到刪除選項' })
      }
      res.status(204).json({ message: '刪除成功', data: removeData })
    } catch (error) {
      next(error)
      res.status(500).json({ error: '刪除失敗' })
    }
  }
  /**
   * Represents a book.
   * @id is the profile image and here pass the link content images
   * @allImage and then pass allImage to the service to remove it
   */
  //this is not part of api but helper function
  private async deleteAllImage(id: any): Promise<void> {
    const allImage = await this.prisma[this.table].findMany({
      where: { id },
      select: {
        title: true,
        image: true
      }
    })
    const content = await this.prisma.content.findFirst({
      where: { title: allImage[0]?.title },
      select: { image: true }
    })

    const profileImage = allImage[0]?.image || ''
    const deleteImage = await pushAndDeleteImage(
      profileImage,
      content?.image as string[]
    )
    return deleteImage
  }
  static get router(): Router {
    if (!imageContentRoutes.instance) {
      imageContentRoutes.instance = new imageContentRoutes()
    }
    return imageContentRoutes.instance.router
  }
}
// private async getImagesFromS3(targets: Array<any>): Promise<string[]> {
//   const images = []
//   for (let i = 0; i < targets.length; i++) {
//     const data = await Server.getBucket(`${targets[i]?.image}`)
//     const b64 = Buffer.from(data.Body).toString('base64')
//     const mimeType = 'image/png' // e.g., image/png
//     images.push(`data:${mimeType};base64,${b64}`)
//   }
//   return images
// }
