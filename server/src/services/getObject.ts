import { AWSError } from 'aws-sdk'
import { s3 } from '../index'
import { GetObjectOutput } from '@aws-sdk/client-s3'
function getS3Object(objKey: string): Promise<GetObjectOutput> {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: 'umbrella-storage',
        Key: objKey
      },
      (err: AWSError, data: any) => {
        if (err) {
          console.log('Aws', err)
          reject(err)
        }
        resolve(data)
      }
    )
  })
}
export async function getObjectsFromS3(targets: any): Promise<any> {
  try {
    const svgs = []
    if (targets.length) {
      for (let i = 0; i < targets.length; i++) {
        const object = await getS3Object(`${targets[i].image}`)
        svgs.push(object.Body?.toString())
      }
    } else {
      for (let i = 0; i < targets.image.length; i++) {
        const object = await getS3Object(`${targets.image[i]}`)
        svgs.push(object.Body)
      }
    }
    return svgs
  } catch (error) {
    console.log(error)
  }
}
