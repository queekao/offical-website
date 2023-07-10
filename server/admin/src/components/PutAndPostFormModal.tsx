import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter
} from 'mdb-react-ui-kit'
import { Button } from 'react-bootstrap'
import CreateForm from './CreateForm'
import { PropsForm } from '../types'

export default function PutAndPostFormModal(props: any) {
  const basicModal = props.basicModal
  const setBasicModal = props.setBasicModal
  const path = props.path
  const method = props.method
  const id = props.id

  const fields: PropsForm[] = [
    ...(/^card/.test(path)
      ? [
          {
            type: 'file',
            name: 'image',
            label: '請上傳照片',
            accept: 'image/jpg,image/jpeg,image/png,image/svg+xml'
          },
          {
            type: 'content',
            name: 'content',
            label: '內容',
            placeholder: '請填寫內容'
          }
        ]
      : []),
    ...(path === 'qnas'
      ? [
          {
            type: 'text',
            name: 'question',
            label: '請填寫問題'
          },
          {
            type: 'text',
            name: 'answer',
            label: '請填寫答案'
          },
          {
            type: 'text',
            name: 'generic',
            label: '請填寫種類(LOAN or PARTTIME)'
          }
        ]
      : []),
    ...(path === 'contacts'
      ? [
          {
            type: 'text',
            name: 'name',
            label: '請填寫名字'
          },
          {
            type: 'text',
            name: 'line',
            label: '請填寫line'
          },
          {
            type: 'text',
            name: 'phone',
            label: '請填寫聯絡電話'
          },
          {
            type: 'content',
            name: 'content',
            label: '內容',
            placeholder: '請填寫內容'
          }
        ]
      : []),
    ...(path === 'treemans' || path === 'richs' || path === 'news'
      ? [
          ...(method === 'post'
            ? [
                {
                  type: 'text',
                  name: 'id',
                  label: '請輸入指定欄位編號(需要數字)',
                  placeholder: '1,2,3,4...(編號不得重複)'
                }
              ]
            : []),
          {
            type: 'file',
            name: 'image',
            label: '請上傳封面照片',
            accept: 'image/jpg,image/jpeg,image/png,image/svg+xml'
          },
          {
            type: 'file',
            name: 'multiImage',
            label: '請上傳內文照片(請把圖片放到資料夾內上傳)',
            accept: 'image/jpg,image/jpeg,image/png,image/svg+xml'
          },
          {
            type: 'text',
            name: 'title',
            label: '標題',
            placeholder: '請填寫標題'
          },
          {
            type: 'content',
            name: 'content',
            label: '內容',
            placeholder: '請填寫內容'
          }
        ]
      : []),
    ...(path === 'videos'
      ? [
          {
            type: 'text',
            name: 'title',
            label: '標題',
            placeholder: '請填寫標題'
          },
          {
            type: 'content',
            name: 'content',
            label: '內容',
            placeholder: '請填寫內容'
          },
          {
            type: 'text',
            name: 'video_url',
            label: '請輸入影片連結',
            placeholder: '請輸入影片連結(封面照片會自動帶入)'
          }
        ]
      : []),
    ...(path === 'auth/change-password'
      ? [
          {
            type: 'te',
            name: 'email',
            label: '信箱',
            placeholder: '請輸入信箱'
          },
          {
            type: 'password',
            name: 'password',
            label: '密碼',
            placeholder: '請輸入密碼'
          },
          {
            type: 'password',
            name: 'confirmPassword',
            label: '確認密碼',
            placeholder: '請確認密碼'
          }
        ]
      : [])
  ]
  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>請填選新增修改欄位</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <CreateForm fields={fields} path={path} method={method} id={id} />
            </MDBModalBody>
            <MDBModalFooter>
              <Button
                color="secondary"
                onClick={() => setBasicModal(!basicModal)}
              >
                關閉
              </Button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
