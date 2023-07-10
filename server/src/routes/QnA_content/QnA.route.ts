import { Prisma, PrismaClient, question_type } from '@prisma/client'
import { Request, Response, NextFunction, Router } from 'express'

export class QnARoutes {
  public static path = '/'
  private static instance: QnARoutes
  private router = Router()
  private prisma = new PrismaClient()
  private constructor() {
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      next()
    })
    this.router.get('/qnas', this.getQnAs)
    this.router.post('/qnas', this.createQnA)
    this.router.put('/qnas/:id', this.updateQnA)
    this.router.delete('/qnas/:id', this.deleteQnA)
  }
  private getQnAs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const loanQnA = await this.prisma.qnA.findMany({
        where: { generic: 'LOAN' }
      })
      const partTimeQnA = await this.prisma.qnA.findMany({
        where: { generic: 'PARTTIME' }
      })
      if (!loanQnA) {
        res.status(404).json({ message: '找不到貸款QA' })
      } else if (!partTimeQnA) {
        res.status(404).json({ message: '找不到澳洲打工QA' })
      }
      res.status(200).send({ loanQnA, partTimeQnA })
    } catch (error) {
      next(error)
      res.status(500).json({ message: '找不到任何QA' })
    }
  }
  private createQnA = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { question, answer, generic } = req.body
      const duplicate = await this.avoidDuplicateContent(question, answer)
      if (duplicate) {
        res.status(400).send({ message: '問題跟答案都不可重複' })
        return
      }
      if (!question || !answer) {
        res.status(400).send({ message: '問題答案都不可空白' })
        return
      } else if (generic !== 'LOAN' && generic !== 'PARTTIME') {
        res.status(400).send({ message: '種類必須要是LOAN或PARTTIME' })
        return
      }
      const createQnA = await this.prisma.qnA.create({
        data: {
          question,
          answer,
          generic: generic satisfies question_type
        } as Prisma.QnAUncheckedCreateInput
      })
      res.status(201).send(createQnA)
    } catch (error) {
      next(error)
      res.status(500).json({ message: '新增問題失敗' })
    }
  }
  private updateQnA = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { question, answer, generic } = req.body
      // const duplicate = await this.avoidDuplicateContent(question, answer)
      // if (duplicate) {
      //   res
      //     .status(400)
      //     .send({ message: 'the Question or Answer already exist' })
      //   return
      // }
      if (generic !== 'LOAN' && generic !== 'PARTTIME') {
        res.status(400).send({ message: '種類必須要是LOAN或PARTTIME' })
        return
      }
      const id: any = Number(req.params.id)
      const qnA = await this.prisma.qnA.findFirst({
        where: {
          id
        }
      })
      if (!qnA) {
        res.status(404).send({ message: 'QA不存在' })
        return
      }
      const updateItem = await this.prisma.qnA.update({
        where: { id: qnA.id },
        data: {
          ...(question ? { question } : {}),
          ...(answer ? { answer } : {}),
          ...(generic ? { generic } : {})
        }
      })
      res.status(202).send({ data: updateItem })
    } catch (error) {
      next(error)
    }
  }
  private deleteQnA = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id: any = Number(req.params.id)
      const qnA = await this.prisma.qnA.findFirst({
        where: {
          id
        }
      })
      if (!qnA) {
        res.status(404).send({ message: 'QA不存在' })
        return
      }
      const deleteItem = await this.prisma.qnA.delete({
        where: { id: qnA.id }
      })
      res.status(204).send({ data: deleteItem })
    } catch (error) {
      next(error)
      res.status(500).json({ message: '刪除QA失敗' })
    }
  }
  private async avoidDuplicateContent(
    question: string,
    answer: string
  ): Promise<boolean> {
    let existQuestion
    let existAnswer
    if (question) {
      existQuestion = await this.prisma.qnA.findFirst({
        where: {
          question
        } as Prisma.QnAWhereInput
      })
    }
    if (answer) {
      existAnswer = await this.prisma.qnA.findFirst({
        where: {
          answer
        } as Prisma.QnAWhereInput
      })
    }
    const duplicate = existQuestion || existAnswer
    return !!duplicate
  }
  static get router(): Router {
    if (!QnARoutes.instance) {
      QnARoutes.instance = new QnARoutes()
    }
    return QnARoutes.instance.router
  }
}
