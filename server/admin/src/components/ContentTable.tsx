import { MDBTableHead, MDBTable, MDBTableBody } from 'mdb-react-ui-kit'
import { Button } from 'react-bootstrap'
import CreateForm from './CreateForm'
import { PropsForm } from '../types'
import { useState } from 'react'
import PutAndPostFormModal from './PutAndPostFormModal'
import DeletePutBtnGroup from './DeletePutBtnGroup'
export default function ContentTable(props: any) {
  const datas = props.datas
  const path = props.path
  const cards = datas?.cards
  const loanQnas = datas?.loanQnA
  const partTimeQnas = datas?.partTimeQnA
  const [basicModal, setBasicModal] = useState(false)
  const showFormModal = () => setBasicModal(!basicModal)
  const fields: PropsForm[] = [
    ...(path === 'service' || path === 'feedback' || path === 'about'
      ? [
          {
            type: 'text',
            name: 'title',
            label: '標題',
            placeholder: '請填入您要的資訊'
          }
        ]
      : []),
    ...(path === 'about'
      ? [
          {
            type: 'text',
            name: 'video_url',
            label: '影片',
            placeholder: '請填入您要的資訊'
          }
        ]
      : [])
  ]

  return (
    <>
      <CreateForm fields={fields} path={path} method="put" />
      <Button className="col-12 my-4" variant="primary" onClick={showFormModal}>
        新增內容
      </Button>
      {basicModal && cards && (
        // this is for create card
        <PutAndPostFormModal
          basicModal={basicModal}
          setBasicModal={setBasicModal}
          path={`card/${path}`}
          method="post"
        />
      )}
      {basicModal && loanQnas && partTimeQnas && (
        // this is for create qnas
        <PutAndPostFormModal
          basicModal={basicModal}
          setBasicModal={setBasicModal}
          path={`${path}`}
          method="post"
        />
      )}
      {basicModal && path === 'contacts' && (
        // this is for create contacts
        <PutAndPostFormModal
          basicModal={basicModal}
          setBasicModal={setBasicModal}
          path={`${path}`}
          method="post"
        />
      )}
      <MDBTable className="caption-top" bordered borderColor="dark">
        <caption className="text-danger">
          ❌ 以下文件請勿{' '}
          <span className="text-danger fw-bold mark">
            重複新增圖片 圖片名稱請用英文
          </span>{' '}
          麻煩新增或刪除修改完後請重新更新頁面
        </caption>
        {path === 'qnas' && (
          <caption className="">
            QA種類都可以替換
            <span className="text-info fw-bold mark">修改或新增種類都必填</span>
          </caption>
        )}
        <caption>{datas?.title ? `標題: ${datas?.title}` : ''}</caption>
        <caption>{datas?.video_url ? `影片: ${datas?.video_url}` : ''}</caption>
        {cards ? <caption>卡片內容</caption> : ''}
        <MDBTableHead>
          {cards ? (
            <>
              <tr>
                <th scope="col">id</th>
                <th scope="col">內容</th>
                <th scope="col">照片</th>
                <th scope="col">修改/刪除</th>
              </tr>
            </>
          ) : (
            ''
          )}
          {loanQnas && partTimeQnas ? (
            <>
              <tr>
                <th scope="col">id</th>
                <th scope="col">問題</th>
                <th scope="col">答案</th>
                <th scope="col">種類</th>
                <th scope="col">修改/刪除</th>
              </tr>
            </>
          ) : (
            ''
          )}
          {datas?.length >= 1 ? (
            <>
              <tr>
                <th scope="col">id</th>
                <th scope="col">創造日期</th>
                <th scope="col">姓名</th>
                <th scope="col">lineID</th>
                <th scope="col">電話</th>
                <th scope="col">修改/刪除</th>
              </tr>
            </>
          ) : (
            ''
          )}
        </MDBTableHead>
        <MDBTableBody>
          {cards
            ? cards.map((card: any) => {
                return (
                  <tr key={card?.id}>
                    <th scope="row">{card?.id}</th>
                    <td>{card?.content}</td>
                    <td>
                      <img
                        src={card?.image}
                        alt="image"
                        style={{ width: '7rem' }}
                      />
                    </td>
                    <td>
                      <DeletePutBtnGroup path={`card`} id={card?.id} />
                    </td>
                  </tr>
                )
              })
            : ''}

          {loanQnas ? (
            <tr>
              <td>貸款Q&A</td>
            </tr>
          ) : (
            ''
          )}
          {loanQnas
            ? loanQnas.map((loanQna: any) => {
                return (
                  <tr key={loanQna?.id}>
                    <th scope="row">{loanQna?.id}</th>
                    <td>{loanQna?.question}</td>
                    <td>{loanQna?.answer}</td>
                    <td>{loanQna?.generic}</td>
                    <td>
                      <DeletePutBtnGroup path={path} id={loanQna?.id} />
                    </td>
                  </tr>
                )
              })
            : ''}
          {partTimeQnas ? (
            <tr>
              <td>澳洲打工Q&A</td>
            </tr>
          ) : (
            ''
          )}
          {partTimeQnas
            ? partTimeQnas.map((partTimeQna: any) => {
                return (
                  <tr key={partTimeQna?.id}>
                    <th scope="row">{partTimeQna?.id}</th>
                    <td>{partTimeQna?.question}</td>
                    <td>{partTimeQna?.answer}</td>
                    <td>{partTimeQna?.generic}</td>
                    <td>
                      <DeletePutBtnGroup path={path} id={partTimeQna?.id} />
                    </td>
                  </tr>
                )
              })
            : ''}
          {path === 'contacts'
            ? datas?.map((data: any) => {
                const date = new Date(data?.created_at)
                return (
                  <tr key={data?.id}>
                    <th scope="row">{data?.id}</th>
                    <td>{date.toUTCString()}</td>
                    <td>{data?.name}</td>
                    <td>{data?.line}</td>
                    <td>{data?.phone}</td>
                    <td>
                      <DeletePutBtnGroup path={path} id={data?.id} />
                    </td>
                  </tr>
                )
              })
            : ''}
        </MDBTableBody>
      </MDBTable>
    </>
  )
}
