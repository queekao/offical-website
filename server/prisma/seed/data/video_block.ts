import { Prisma } from '@prisma/client'
// I store image key of s3 and retrieve them by SDK
export const videoData: Prisma.video_blockCreateInput[] = [
  {
    title: '歡迎認識傘下',
    poster: 'https://img.youtube.com/vi/1rfPdoEelgk/0.jpg'
  }
]
