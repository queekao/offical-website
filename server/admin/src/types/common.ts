export type UserForm = {
  email: string
  password: string
}
export interface PropsForm {
  type: string
  name: string
  label?: string
  placeholder?: string
  accept?: string
}
export interface FieldsProps {
  fields: PropsForm[]
  path: string
  method: string
  id?: number
}
// export interface AxiosResponse<T = any> {
//   data: T
//   status: number
//   statusText: string
//   headers: any
//   request?: any
// }
