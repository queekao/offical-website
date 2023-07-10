import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FieldsProps, PropsForm } from '../types'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { ReactNode, useRef, useState } from 'react'
import * as Yup from 'yup'
function CreateForm(props: FieldsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputFolder = useRef<HTMLInputElement | null>(null)

  // const validationSchema = Yup.object().shape({
  //   email: Yup.string().required('信箱必填').email('信箱錯誤'),
  //   password: Yup.string()
  //     .required('密碼錯誤')
  //     .min(6, '密碼長度太短至少6位以上')
  //     .max(40, '密碼長度太長超過40位')
  // })

  const path = props?.path
  const method = props?.method
  const id = props?.id
  const validationSchema = Yup.object().shape(
    props.fields.reduce((schema: any, value: PropsForm) => {
      schema[value.name] = Yup.string()
      return schema
    }, {})
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = async (data: any) => {
    const formData = new FormData()
    console.log(data)

    const file = inputRef?.current?.files?.[0] as File
    if (file) {
      formData.append('image', file)
      for (const key in data) {
        formData.append(key, data[key])
      }
    }
    if (inputFolder?.current?.files) {
      // upload folder
      for (let i = 0; i < inputFolder?.current?.files?.length; i++) {
        if (inputFolder.current.files[i].name === '.DS_Store') {
          console.log('no add .DS_Store')
        } else {
          formData.append('multiImage', inputFolder.current.files[i])
        }
      }
    }
    try {
      setIsLoading(true)
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/${path}${id ? '/' + id : ''}`,
        method,
        data: file || formData.get('multiImage') ? formData : data
      })

      if (response?.status === 201 && path !== 'auth/login') {
        alert(`新增成功`)
      } else if (response?.status === 202) {
        alert(`修改成功`)
      } else if (response?.status === 201 && path === 'auth/login') {
        alert(response?.data?.message)
      } else if (response?.status === 202 && path === 'auth/change-password') {
        alert(response?.data?.message)
      }
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      console.error(error)
      alert(error?.response?.data?.message)
    }
  }
  return (
    <form
      className="container my-4"
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
    >
      {!isLoading &&
        props.fields.map((field, index) => {
          return (
            <div className="row mb-2" key={index}>
              <label className="mb-2" htmlFor={field?.name}>
                {field?.label}
              </label>
              {field.name === 'content' && (
                <textarea
                  className="form-control"
                  {...register(field?.name, {
                    required: true
                  })}
                  id={field?.name}
                />
              )}
              {field.type === 'file' && field.name === 'image' && (
                <input
                  className="form-control"
                  {...register(field?.name, {
                    required: true
                  })}
                  id={field?.name}
                  type={field?.type}
                  accept={field?.accept}
                  placeholder={field?.placeholder}
                  ref={inputRef}
                />
              )}
              {field.type === 'file' && field.name === 'multiImage' && (
                <input
                  className="form-control"
                  {...register(field?.name, {
                    required: true
                  })}
                  type={field?.type}
                  accept={field?.accept}
                  placeholder={field?.placeholder}
                  id={field?.name}
                  ref={node => {
                    // only can upload folder
                    inputFolder.current = node
                    if (node) {
                      ;['webkitdirectory', 'directory', 'mozdirectory'].forEach(
                        attr => {
                          node.setAttribute(attr, '')
                        }
                      )
                    }
                  }}
                />
              )}
              {field.type !== 'file' && field.type !== 'content' && (
                <input
                  className="form-control"
                  {...register(field?.name, {
                    required: true
                  })}
                  id={field?.name}
                  type={field?.type}
                  placeholder={field?.placeholder}
                  autoComplete={path === 'auth/change-password' ? 'on' : 'off'}
                />
              )}
              {errors[field?.name] && (
                <p className="text-danger my-1">
                  {errors[field?.name]?.message as ReactNode}
                </p>
              )}
            </div>
          )
        })}
      {isLoading && <div>Loading...</div>}
      {path === 'auth/login' && (
        <Button
          className="col-12 mt-2"
          variant="primary"
          type={'submit'}
          disabled={isLoading}
        >
          登入
        </Button>
      )}
      {method === 'post' && path !== 'auth/login' ? (
        <Button
          className="col-12 mt-2"
          variant="primary"
          type={'submit'}
          disabled={isLoading}
        >
          新增
        </Button>
      ) : (
        ''
      )}
      {(path === 'service' && method === 'put') ||
      (path === 'about' && method === 'put') ||
      (path === 'feedback' && method === 'put') ||
      (path === 'card' && method === 'put') ||
      (id && method === 'put') ||
      path === 'auth/change-password' ? (
        <Button
          className="col-12 mt-2"
          variant="warning"
          type={'submit'}
          disabled={isLoading}
        >
          修改
        </Button>
      ) : (
        ''
      )}
    </form>
  )
}

export default CreateForm
{
  /* <div key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                {...register(field.type as 'password', { required: true })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div> */
}
