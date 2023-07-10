import { s3 } from '../index'
export function getImageUrl(objKey: string): Promise<string> {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl(
      'getObject',
      {
        Bucket: 'umbrella-storage',
        Key: objKey
      },
      function (err: Error, url: string): void {
        if (err) {
          console.log('Aws', err)
          reject(err)
        }
        resolve(url)
      }
    )
  })
}
export async function getImagesFromS3(targets: any): Promise<any> {
  try {
    const images = []
    if (targets.length) {
      for (let i = 0; i < targets.length; i++) {
        const url = await getImageUrl(`${targets[i].image}`)
        images.push(url)
      }
    } else {
      for (let i = 0; i < targets.image.length; i++) {
        const url = await getImageUrl(`${targets.image[i]}`)
        images.push(url)
      }
    }
    return images
  } catch (error) {
    console.log(error)
  }
}
