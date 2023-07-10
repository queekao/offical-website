import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction, Router } from 'express'
import bcrypt from 'bcrypt'
import { sendConfirmationEmail } from '../../services/mailSender'
/**
 * @swagger
 */
export class authRoutes {
  public static path = '/auth'
  private static instance: authRoutes
  private router = Router()
  private prisma = new PrismaClient()
  private constructor() {
    this.router.use((req: Request, res: Response, next: NextFunction) => {
      // check the path before route
      // const id: any = Number(req.path.split('/')[2])
      next()
    })
    this.router.post('/confirm/:confirmationCode', this.confirmUser)
    this.router.post('/login', this.login)
    this.router.put('/change-password', this.updateUser)
  }
  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { password, email } = req.body
      const user = await this.prisma.user.findFirst({ where: { email } })
      // validator the user
      if (!user) {
        res.status(404).send({ message: '沒有這使用者' })
        return
      }
      if (!password) {
        // ⭐️ when hash compare the password or hashPassword both can't be empty
        res.status(400).json({
          message: '請輸入密碼'
        })
        return
      }
      const isPasswordValid = await bcrypt.compare(password, user.password) //compare the user enter password and database password
      if (!isPasswordValid) {
        res.status(401).json({
          message: '請輸入正確密碼'
        })
        return
      }
      // send mail
      const result = await sendConfirmationEmail(email, user.confirmationCode)
      if (user.status === 'PENDING') {
        res.status(201).send({ message: '請到郵箱確認登入連結', result })
        return
      }
      // delete user?.password //password is privacy stuff we need to use encrypt password
    } catch (error) {
      next(error)
      res.status(500).json({ message: '讀取資料失敗', error })
    }
  }
  private confirmUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // const token = req.headers.authorization
      // console.log(token)
      const confirmationCode = req.params.confirmationCode
      const confirmUser = await this.prisma.user.findFirst({
        where: { confirmationCode: confirmationCode }
      })
      if (!confirmUser) {
        res.status(404).send({ message: 'User Not found.' })
        return
      } else {
        confirmUser.status = 'ACTIVE'
      }
      if (confirmUser.status === 'ACTIVE') {
        const characters =
          '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let token = ''
        for (let i = 0; i < 25; i++) {
          token += characters[Math.floor(Math.random() * characters.length)]
        }
        res.status(201).send({ message: '登入成功', data: confirmUser }) // store token in the localstorage
        await this.prisma.user.update({
          where: {
            id: confirmUser.id
          },
          data: {
            confirmationCode: token
          }
        })
      }
    } catch (error) {
      next(error)
      res.status(500).json({ message: '讀取資料失敗', error })
    }
  }
  private updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { password, confirmPassword, email } = req.body
      if (password.length < 6) {
        res.status(400).send({ message: '密碼長度請大於6' })
        return
      }
      if (password !== confirmPassword) {
        res.status(400).send({ message: '密碼和確認密碼要相同' })
        return
      }
      const user = await this.prisma.user.findFirst({ where: { email } })
      if (!user) {
        res.status(404).send({ message: '找不到該使用者' })
        return
      }
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = bcrypt.hashSync(password, salt)
      const updateUser = await this.prisma.user.update({
        where: { id: user?.id },
        data: {
          password: hashPassword
        }
      })
      res.status(202).send({ message: '更新使用者成功', data: updateUser })
    } catch (error) {
      next(error)
      res.status(500).json({ message: '讀取資料失敗', error })
    }
  }

  static get router(): Router {
    if (!authRoutes.instance) {
      authRoutes.instance = new authRoutes()
    }
    return authRoutes.instance.router
  }
}
