import dotenv from 'dotenv'
import nodemailer, { TransportOptions } from 'nodemailer'
// import { google } from 'googleapis'
dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod'
})
// const client = new OAuth2Client({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: 'YOUR_CLIENT_SECRET',
//   redirectUri: 'YOUR_REDIRECT_URI'
// })
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// )
// const scopes = ['https://www.googleapis.com/auth/gmail.modify']
// const url = oAuth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',

//   // If you only need one scope you can pass it as a string
//   scope: scopes
// })
// console.log(url)
// oAuth2Client.setCredentials({
//   refresh_token: process.env.REFRESH_TOKEN
// })
// const refreshAccessToken = async (): Promise<void> => {
//   try {
//     // Get a new access token using the current refresh token
//     const { tokens } = (await oAuth2Client.refreshAccessToken()) as any
//     const newRefreshToken = tokens.refresh_token

//     // Store the new refresh token for future use
//     // You can update your database or any other storage mechanism here
//     // Example: updateRefreshTokenInDatabase(newRefreshToken);

//     // Set the new refresh token in the OAuth2 client
//     oAuth2Client.setCredentials({
//       refresh_token: newRefreshToken
//     })

//     console.log('Access token refreshed successfully')
//   } catch (error) {
//     console.error('Error refreshing access token:', error)
//   }
// }
// setInterval(refreshAccessToken, 3600000)
export const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'xeriok925999@gmail.com',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
    // accessToken: oAuth2Client.getAccessToken()
  }
} as TransportOptions)
