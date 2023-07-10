import { useEffect, useState, ChangeEvent, useRef } from 'react'
import axios from 'axios'

function UserForm() {
  const [image, setImage] = useState<string>()
  const inputFolder = useRef<HTMLInputElement | null>(null)
  const singleFile = useRef<HTMLInputElement | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  })
  async function fetchData() {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/treeman/1`
    )
    setImage(data.image)
    console.log('fetch')
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }
  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData()
    if (singleFile.current?.files) {
      data.append('image', singleFile.current.files[0])
    }

    if (inputFolder.current?.files) {
      for (let i = 0; i < inputFolder.current.files.length; i++) {
        if (inputFolder.current.files[i].name === '.DS_Store') {
          console.log('no add')
        } else {
          data.append('multiImage', inputFolder.current.files[i])
        }
      }
    }

    data.append('title', formData.title)
    data.append('content', formData.content)

    // console.log(data.get('title'))
    // console.log(data.getAll('image'))
    axios
      .put(`${import.meta.env.VITE_API_URL}/api/v1/card/19`, data)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      })
  }
  return (
    // https://stackoverflow.com/questions/71444475/webkitdirectory-in-typescript-and-react directory solution
    <>
      <img src={image} style={{ width: '100px' }} alt="" />
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/jpg,image/jpeg,image/png"
          ref={singleFile}
        />
        <input
          type="file"
          name="multiImage"
          accept="image/jpg,image/jpeg,image/png"
          ref={node => {
            inputFolder.current = node
            if (node) {
              ;['webkitdirectory', 'directory', 'mozdirectory'].forEach(
                attr => {
                  node.setAttribute(attr, '')
                }
              )
            }
          }}
          multiple={true}
        />

        <div>
          <label htmlFor="title">title</label>
          <input type="text" id="title" name="title" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="content">content</label>
          <input
            type="text"
            id="content"
            name="content"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
export default UserForm
