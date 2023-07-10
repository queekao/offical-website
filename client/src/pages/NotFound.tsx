import React, { ChangeEvent, useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
const Container = styled.div`
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 6rem;
    color: var(--black);
    text-align: center;
    font-weight: 400;
  }
`
const NotFound: React.FC = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    age: 0
  })

  const submitHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const { name, email, age } = values
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}`)
    console.log(data)
  }
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <Container>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          name="name"
          onChange={e => inputHandler(e)}
        />
        <input
          type="text"
          placeholder="useremail"
          name="email"
          onChange={e => inputHandler(e)}
        />
        <input
          type="number"
          placeholder="userage"
          name="age"
          onChange={e => inputHandler(e)}
        />
        <button type="submit">Insert Data</button>
      </form>
      <h1>404 Not Found</h1>
    </Container>
  )
}

export default NotFound
