import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import { userData } from './data/user'
import { aboutData } from './data/about'
import { cardData } from './data/card'
import { contentData } from './data/content'
import { feedbackData } from './data/feedback'
import { newsData } from './data/news'
import { QnAData } from './data/QnA'
import { richData } from './data/rich_block'
import { serviceData } from './data/service'
import { treemanData } from './data/treeman_block'
import { videoData } from './data/video_block'
import { videoContentData } from './data/video_block_content'
const prisma = new PrismaClient()
dotenv.config({
  path: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.prod'
})
async function createRecords(
  dataArray: any[],
  modelName: string
): Promise<any> {
  try {
    for (let i = 0; i < dataArray.length; i++) {
      await (prisma[modelName as keyof PrismaClient] as any).create({
        data: dataArray[i]
      })
    }
  } catch (error) {
    if (error) return error
  }
}
async function createData(data: object, modelName: string): Promise<any> {
  try {
    await (prisma[modelName as keyof PrismaClient] as any).create({
      data: data
    })
  } catch (error) {
    if (error) return error
  }
}
async function seedData(): Promise<any> {
  console.log(`Start seeding ...`)
  try {
    await createRecords(userData, 'user')
    await createData(aboutData, 'about')
    await createData(serviceData, 'service')
    await createData(feedbackData, 'feedback')
    await createRecords(cardData, 'card')
    await createRecords(QnAData, 'qnA')
    await createRecords(newsData, 'news')
    await createRecords(richData, 'rich_block')
    await createRecords(treemanData, 'treeman_block')
    await createRecords(contentData, 'content')
    await createRecords(videoData, 'video_block')
    await createRecords(videoContentData, 'video_block_content')
    console.log(`Seeding finished.`)
  } catch (error) {
    if (error) return error
  }
}
seedData()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
// "seed": "node --loader ts-node/esm prisma/seed/index.ts"
