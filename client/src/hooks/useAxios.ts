import { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ResponseData } from '../types'

export function useAxios<T>(
  path: string,
  method: string,
  data?: any
): ResponseData<T> {
  const [datas, setDatas] = useState<T | null>(null)
  const [axiosError, setAxiosError] = useState<Error | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // const abortController = new AbortController()
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios({
          url: `${import.meta.env.VITE_API_URL}/${path}`,
          method: method,
          data: data ? data : ''
          // signal: abortController.signal
        })

        setDatas(response.data)
        setLoading(false)
      } catch (error: any) {
        setAxiosError(error)
        setLoading(false)
      }
    }
    return () => {
      fetchData()
      // abortController.abort()
    }
  }, [data, method, path])

  return { datas, loading, error: axiosError }
}

export default useAxios
