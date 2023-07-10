import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'
import PutAndPostFormModal from './PutAndPostFormModal'
function DeletePutBtnGroup(props: any) {
  const path = props?.path
  const id = props?.id
  const [basicModal, setBasicModal] = useState(false)
  const showFormModal = () => setBasicModal(!basicModal)
  const submitForm = async (method: string) => {
    const confirmed = window.confirm('您確定刪除此項目嗎?')
    try {
      if (confirmed) {
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/${path}/${id}`,
          method: method
        })
        if (response.status === 204) {
          alert('刪除成功')
        }
      }
    } catch (error: any) {
      console.error(error)
      alert(error?.response?.data?.message)
    }
  }
  return (
    <>
      {basicModal && (
        <PutAndPostFormModal
          basicModal={basicModal}
          setBasicModal={setBasicModal}
          path={`${path}`}
          method="put"
          id={id}
        />
      )}
      {path === 'contacts' ? (
        ''
      ) : (
        <Button
          className="col-12 mt-2"
          variant="warning"
          onClick={showFormModal}
        >
          修改
        </Button>
      )}
      <Button
        className="mt-2"
        variant="danger"
        onClick={() => submitForm('delete')}
      >
        刪除
      </Button>
    </>
  )
}

export default DeletePutBtnGroup
