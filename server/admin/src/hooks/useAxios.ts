import { useState, useEffect } from 'react'
import axios from 'axios'
// import { AxiosResponse } from '../types'

export const useAxios = (path: string, method: string, formData?: any) => {
  const [datas, setDatas] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [axiosError, setAxiosError] = useState<any>(null)
  const payload = new FormData()

  useEffect(() => {
    // const abortController = new AbortController()
    const fetchData = async () => {
      try {
        console.log('one')
        const response = await axios({
          url: `${import.meta.env.VITE_API_URL}/${path}`,
          method: method,
          data: formData ? payload : ''
          // signal: abortController.signal
        })

        setDatas(response.data)
        setLoading(false)
      } catch (error: any) {
        setAxiosError(error)
        setDatas(axiosError?.response?.data?.form)
        setLoading(false)
      }
    }
    return () => {
      // abortController.abort()
      fetchData()
    }
  }, [])

  return { datas, loading, axiosError }
}

export default useAxios
