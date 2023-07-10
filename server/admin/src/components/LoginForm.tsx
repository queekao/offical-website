import { PropsForm } from '../types'
import CreateForm from './CreateForm'
import { MDBTypography } from 'mdb-react-ui-kit'

function LoginForm() {
  const loginFields: PropsForm[] = [
    {
      type: 'email',
      name: 'email',
      label: '信箱',
      placeholder: '請輸入信箱'
    },
    {
      type: 'password',
      name: 'password',
      label: '密碼',
      placeholder: '請輸入密碼'
    }
  ]

  return (
    <div className="flex justify-content-center align-item-center">
      <MDBTypography className="text-center display-2 pb-3 mt-4 mb-4 border-bottom">
        傘下後台網站
      </MDBTypography>
      <CreateForm fields={loginFields} path={'auth/login'} method="post" />
    </div>
  )
}

export default LoginForm
