import bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client'

const salt = bcrypt.genSaltSync(10)
const password = ['AwsVerygood8998@', 'xeriok92599']
const hashedPassword1 = bcrypt.hashSync(password[0], salt)
const hashedPassword2 = bcrypt.hashSync(password[1], salt)

const characters =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let token1 = ''
let token2 = ''
for (let i = 0; i < 25; i++) {
  token1 += characters[Math.floor(Math.random() * characters.length)]
  token2 += characters[Math.floor(Math.random() * characters.length)]
}
export const userData: Prisma.userCreateInput[] = [
  {
    email: 'adfreetwad@gmail.com',
    password: hashedPassword1,
    confirmationCode: token1
  },
  {
    email: 'azxcvbnm512@yahoo.com.tw',
    password: hashedPassword2,
    confirmationCode: token2
  }
]
