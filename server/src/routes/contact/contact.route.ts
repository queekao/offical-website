import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction, Router } from 'express'

export class ContactRoutes {
  public static path = '/'
  private static instance: ContactRoutes
  private router = Router()
  private prisma = new PrismaClient()
  private constructor() {
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      next()
    })
    this.router.get('/contacts', this.getContacts)
    this.router.post('/contacts', this.createContact)
    this.router.delete('/contacts/:id', this.deleteContact)
  }
  private getContacts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const getForms = await this.prisma.contact.findMany()
      if (getForms.length === 0) {
        res.status(404).send({ message: '沒有表單' })
        return
      }
      res.status(200).send(getForms)
    } catch (error) {
      next(error)
      res.status(500).json({ error: '找不到表單' })
    }
  }
  private createContact = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { line, name, phone, content } = req.body
      if (!line) {
        res.status(400).send({ message: 'line不能是空的' })
        return
      } else if (!name) {
        res.status(400).send({ message: '名字不能是空的' })
        return
      } else if (!phone) {
        res.status(400).send({ message: '電話不能是空的' })
        return
      } else if (!content) {
        res.status(400).send({ message: '內容不能是空的' })
        return
      }
      const contact = await this.prisma.contact.findFirst({
        where: {
          line,
          name,
          phone,
          content
        }
      })
      if (contact) {
        res.status(400).send({ message: '表單已存在' })
        return
      }
      const createForm = await this.prisma.contact.create({
        data: {
          line,
          name,
          phone,
          content
        }
      })
      res.status(201).send({ data: createForm })
    } catch (error) {
      next(error)
      res.status(500).json({ error: '創建表單失敗' })
    }
  }
  private deleteContact = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id: any = req.params.id
    try {
      const contact = await this.prisma.contact.findUnique({
        where: {
          id
        }
      })
      if (!contact) {
        res.status(404).send({ message: '表單不存在' })
        return
      }
      const deleteForm = await this.prisma.contact.delete({
        where: { id }
      })
      res.status(204).send({ data: deleteForm })
    } catch (error) {
      next(error)
      res.status(500).json({ error: '刪除表單失敗' })
    }
  }
  static get router(): Router {
    if (!ContactRoutes.instance) {
      ContactRoutes.instance = new ContactRoutes()
    }
    return ContactRoutes.instance.router
  }
}
