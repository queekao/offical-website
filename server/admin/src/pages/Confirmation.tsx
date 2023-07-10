import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Button } from 'react-bootstrap'
const ConfirmationPage = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { confirmation } = params
  const context = useContext(AuthContext)

  const confirmLogin = async () => {
    try {
      const login = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/confirm/${confirmation}`
      )
      if (login.status === 201) {
        context.onLogin(login.data)
        alert('登入成功')
        navigate('/')
      }
    } catch (error: any) {
      alert(error.response.data.message)
    }
  }
  return (
    <div className="container my-4">
      <h1>確認登入頁</h1>
      <Button onClick={confirmLogin}>登入</Button>
    </div>
  )
}

export default ConfirmationPage
