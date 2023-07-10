import { AWSError } from 'aws-sdk'
import { s3 } from '../index'
import { ListObjectVersionsOutput } from '@aws-sdk/client-s3'

export function putObjectFromS3(objKey: string, file: string): Promise<any> {
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: process.env.STORAGE_BUCKET || '',
        Key: objKey,
        Body: file
      },
      function (err: AWSError, data: ListObjectVersionsOutput): void {
        if (err) {
          console.log('Aws', err)
          reject(err)
        }
        resolve(data)
      }
    )
  })
}
