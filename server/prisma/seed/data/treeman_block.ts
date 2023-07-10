import { Prisma } from '@prisma/client'
// I store image key of s3 and retrieve them by SDK
export const treemanData: Prisma.treeman_blockCreateInput[] = [
  {
    title: '什麼是『財富自由』，它本質你有夠瞭解嗎!',
    image: 'umbrella/treeman_profile/1.jpg'
  }
]
