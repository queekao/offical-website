import dotenv from 'dotenv'
import nodemailer, { TransportOptions } from 'nodemailer'
// import { google } from 'googleapis'
dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod'
})
// const SCOPES = ['https://www.googleapis.com/auth/gmail.send']
// const code = ''

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// )
// oAuth2Client.getToken(code).then(({ tokens }) => {
//   // const tokenPath = path.join('./', 'token.json')
//   // fs.writeFileSync(tokenPath, JSON.stringify(tokens))
//   console.log(tokens)

//   console.log('Access token and refresh token stored to token.json')
// })
export const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'xeriok925999@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
  }
} as TransportOptions)
