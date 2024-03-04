import React from 'react'
// import { About } from '../types'
import styled from '@emotion/styled'
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  margin: 1rem 2rem;
  .card {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: var(--primary-light);
    border-radius: var(--border-sharped);
    padding: 1rem;
  }
  img {
    width: 8rem;
    margin-bottom: 2.3rem;
  }
  p {
    font-size: var(--p);
    color: var(--primary-dark);
  }
`
function Card(props: any): React.ReactElement {
  {
    props.loading && <div>loading..</div>
  }
  return (
    <Container>
      {!props.loading
        ? props.cards.map((data: any) => (
            <div className="card" key={data?.id}>
              <img src={data?.image} alt="傘下" />
              <p>{data?.content}</p>
            </div>
          ))
        : null}
    </Container>
  )
}

export default Card
