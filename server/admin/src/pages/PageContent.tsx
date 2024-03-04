// import { ContentProps } from '../types'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useAxios } from '../hooks'
import ContentTable from '../components/ContentTable'
import ProfileCard from '../components/ProfileCard'
import { useState } from 'react'
import PutAndPostFormModal from '../components/PutAndPostFormModal'
function PageContent() {
  const params = useParams()
  const [basicModal, setBasicModal] = useState(false)
  const showFormModal = () => {
    setBasicModal(!basicModal)
  }
  const { path } = params
  const { datas, axiosError, loading } = useAxios(`${path}`, 'get')
  // if (path === 'card') {
  //   console.log('hello')

  // loading && alert('loading...')
  // }
  return (
    <div className="container">
      {loading && <div>loading...</div>}
      {axiosError && (
        <div className="text-danger fw-bold mt-4">
          {axiosError?.response?.data.message}
        </div>
      )}

      {path !== 'treemans' &&
      path !== 'news' &&
      path !== 'richs' &&
      path !== 'videos' ? (
        <ContentTable datas={axiosError ? [] : datas} path={path} />
      ) : (
        ''
      )}
      <div className="row gap-4">
        {basicModal && (
          <PutAndPostFormModal
            basicModal={basicModal}
            setBasicModal={setBasicModal}
            path={`${path}`}
            method="post"
          />
        )}
        {path === 'treemans' ||
        path === 'news' ||
        path === 'richs' ||
        path === 'videos'
          ? datas?.map((data: any) => {
              return (
                <div key={data?.id} className="col-md">
                  <ProfileCard data={data} path={path} />
                </div>
              )
            })
          : ''}
        {path === 'treemans' ||
        path === 'news' ||
        path === 'richs' ||
        path === 'videos' ? (
          <>
            <Button
              className="col-12 mt-2"
              variant="primary"
              onClick={showFormModal}
            >
              新增
            </Button>
            {/* <nav aria-label="..." className="mt-4">
              <ul className="pagination pagination-lg justify-content-center">
                <li className="page-item active" aria-current="page">
                  <span className="page-link">1</span>
                </li>
              </ul>
            </nav> */}
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default PageContent
