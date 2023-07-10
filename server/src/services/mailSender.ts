import { SentMessageInfo } from 'nodemailer'
import { transport } from '../models'
export const sendConfirmationEmail = async (
  email: string,
  confirmationCode: string
): Promise<SentMessageInfo> => {
  try {
    const result = await transport.sendMail({
      from: '<no-reply>@gmail.com',
      to: email,
      subject: '請確認登入',
      html: `<h1>信箱確認</h1>
          <h2>您好</h2>
          <p>請點選以下連結確認登入</p>
          <a href=${process.env.ADMIN}/auth/${confirmationCode}> Click here</a>
          </div>`
    })
    return result
  } catch (error) {
    console.log(error)
  }
}
