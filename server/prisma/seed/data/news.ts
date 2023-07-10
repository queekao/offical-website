import { Prisma } from '@prisma/client'
// I store image key of s3 and retrieve them by SDK
export const newsData: Prisma.newsCreateInput[] = [
  {
    title: '年終尾牙～圓滿結束',
    image: 'umbrella/news_profile/1.jpg'
  },
  {
    title: '傘下的開幕茶會',
    image: 'umbrella/news_profile/2.jpg'
  },
  {
    title:
      '『共心、共行、共好！一個讓你真正可以實現財富流真實含義的商會平台-衖商會』',
    image: 'umbrella/news_profile/3.jpg'
  },
  {
    title: '讓傘下書院成為您充電的藏寶閣',
    image: 'umbrella/news_profile/4.jpg'
  },
  {
    title: '一個讓你真正可以實現財富流真實含義的商會平台-衖商會',
    image: 'umbrella/news_profile/5.jpg'
  },
  {
    title: '春滿澳洲 錢兔似錦',
    image: 'umbrella/news_profile/6.jpg'
  },
  {
    title: '2023年2月1日 傘下管理顧問有限公司 正式啟航',
    image: 'umbrella/news_profile/10.jpg'
  },
  {
    title: '傘下信用養成布局術講座',
    image: 'umbrella/news_profile/11.jpg'
  }
]
