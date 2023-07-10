import multer, { Multer } from 'multer'
import { Request } from 'express'
import multerS3 from 'multer-s3'
import { s3Config } from '../index'
// export interface MulterRequest extends Request {
//   fileValidationError: any
// }
export const uploadWithPath = (
  profilePath: string,
  contentPath: string
): Multer => {
  const upload = multer({
    limits: {
      fileSize: 1024 * 1024 * 5 // 5MB
    },
    storage: multerS3({
      s3: s3Config,
      bucket: process.env.STORAGE_BUCKET || '',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname })
      },
      key: (req, file, cb) => {
        const fileName = file.originalname
        if (file.fieldname === 'image') {
          const key = profilePath + fileName
          cb(null, key)
        } else if (file.fieldname === 'multiImage') {
          const key = contentPath + fileName
          cb(null, key)
        }
      }
    }),
    fileFilter: (req: Request, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
        return cb(new Error('Invalid file type'))
      } else {
        cb(null, true) // Accept the file
      }
    }
  })
  return upload
}
