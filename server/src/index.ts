import { Server } from './server'
import AWS from 'aws-sdk'
import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.AWS_REGION,
  apiVersion: '2006-03-01'
})
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY
})
export const s3Config = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY || '',
    secretAccessKey: process.env.SECRET_KEY || ''
  },
  region: process.env.AWS_REGION
})
const PORT = 3030
const HOST = '0.0.0.0' // accept All IPV4
export const app = Server.bootstrap().app
export const server = app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}/`)
})
