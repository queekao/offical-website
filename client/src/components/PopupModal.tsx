import React from 'react'
import styled from '@emotion/styled'
import { useAxios } from '../hooks'
import { About } from '../types'
import Card from './Card'
const Container = styled.div`
  position: relative;
  .outline {
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    width: 100%;
    background-color: var(--primary-light);
    /* filter: blur(40px); */
  }
  .content {
    h1 {
      font-size: var(--h1);
    }
  }
`
function PopupModal(): React.ReactElement {
  const { error, datas, loading } = useAxios<About>('/about', 'get')
  console.log(datas, error, loading)

  // const [datas, setData] = useState<any>()
  // const prisma = new PrismaClient()
  // useEffect(() => {
  //   const abortController = new AbortController()
  //   const getData = async () => {
  //     try {
  //       const response = await axios({
  //         url: `${import.meta.env.VITE_API_URL}/about`,
  //         method: 'get',
  //         signal: abortController.signal
  //       })
  //       console.log(response)

  //       setData(response)
  //       console.log(datas)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getData()
  //   return () => {
  //     console.log('Request aborted by user')
  //     abortController.abort()
  //   }
  // }, [])
  return (
    <Container>
      <img className="outline" src="/assets/outlineOnly.webp" alt="outline" />
      <div className="content">
        <h1>{datas?.title}</h1>
        <iframe
          width="560"
          height="315"
          src={datas?.video_url}
          title="傘下"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        <Card cards={datas?.cards} loading={loading} />
      </div>
    </Container>
  )
}

export default PopupModal
