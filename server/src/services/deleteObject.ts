import { AWSError } from 'aws-sdk'
import { s3 } from '../index'
import {
  DeleteObjectOutput,
  ListObjectVersionsOutput
} from '@aws-sdk/client-s3'
import { ObjectIdentifierList, ObjectKey } from 'aws-sdk/clients/s3'
export function listObjectVersion(
  objKey: string
): Promise<ListObjectVersionsOutput> {
  return new Promise((resolve, reject) => {
    s3.listObjectVersions(
      {
        Bucket: process.env.STORAGE_BUCKET || '',
        Prefix: objKey
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
function deleteAllObject(
  objKey: ObjectIdentifierList
): Promise<DeleteObjectOutput> {
  return new Promise((resolve, reject) => {
    s3.deleteObjects(
      {
        Bucket: process.env.STORAGE_BUCKET || '',
        Delete: {
          Objects: objKey
        }
      },
      function (err: AWSError, data: DeleteObjectOutput): void {
        if (err) {
          console.log('Aws', err)
          reject(err)
        }
        resolve(data)
      }
    )
  })
}
export async function deleteOneObject(objKey: ObjectKey): Promise<any> {
  if (!objKey) return // guard
  return new Promise((resolve, reject) => {
    s3.deleteObject(
      {
        Bucket: process.env.STORAGE_BUCKET || '',
        Key: objKey
      },
      function (err: AWSError, data: DeleteObjectOutput): void {
        if (err) {
          console.log('Aws', err)
          reject(err)
        }
        resolve(data)
      }
    )
  })
}
export async function pushAndDeleteImage(
  profileImage?: string,
  contentImages?: Array<string>
): Promise<any> {
  const removeImage: any = []
  console.log(profileImage, contentImages)
  if (contentImages?.length !== 0) {
    // multiImage
    for (let i = 0; i < (contentImages as any)?.length; i++) {
      removeImage.push({ Key: (contentImages as any)[i] })
    }
  }
  // image
  if (profileImage) removeImage.push({ Key: profileImage })
  const deleteImageFromS3 = await deleteAllObject(removeImage)

  return deleteImageFromS3
}
