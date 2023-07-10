import { useParams } from 'react-router-dom'
import { MDBTableHead, MDBTable, MDBTableBody } from 'mdb-react-ui-kit'
import { useAxios } from '../hooks'
import DeletePutBtnGroup from './DeletePutBtnGroup'
function ProfileCardContent() {
  const params = useParams()
  const { path, id } = params // this id profile we use this for update
  const { datas, axiosError, loading } = useAxios(`${path}/${id}`, 'get')
  console.log(datas?.video_url)

  return (
    <div className="container">
      {loading && <div>loading...</div>}
      {axiosError && (
        <div className="text-danger fw-bold mt-4">
          {axiosError?.response?.data.message}
        </div>
      )}

      <MDBTable bordered borderColor="dark">
        <MDBTableHead>
          <>
            <tr>
              <th scope="col">id</th>
              <th scope="col">標題</th>
              <th scope="col">內容</th>
              <th scope="col">封面照片</th>
              <th scope="col">照片/影片(上傳後就不能單獨刪掉)</th>
              <th scope="col">修改/刪除</th>
            </tr>
          </>
        </MDBTableHead>
        <MDBTableBody>
          <tr key={datas?.id}>
            <th scope="row">{datas?.id}</th>
            <td>{datas?.title}</td>
            <td>{datas?.content}</td>
            <td>
              <img
                style={{ width: '10rem' }}
                src={datas?.profile_image}
                alt="image"
              />
            </td>
            <td>
              {datas?.images
                ? datas?.images?.map((image: string) => {
                    return (
                      <img
                        key={image}
                        className="mt-1 mx-1"
                        style={{ width: '10rem' }}
                        src={image}
                        alt="image"
                      />
                    )
                  })
                : ''}
              {datas?.video_url
                ? datas?.video_url?.map((videoUrl: string) => {
                    return <iframe key={videoUrl} src={videoUrl} />
                  })
                : ''}
            </td>
            <td>
              {/* need to pass content id here for update the content and block */}
              <DeletePutBtnGroup path={path} id={id} />
            </td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </div>
  )
}

export default ProfileCardContent
