import { css } from '@emotion/react'
const GlobalStyle = css`
  *,
  html,
  body {
    margin: 0;
    font-family: 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
      'Droid Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    border: 0;
    font-size: 62.5%;
    letter-spacing: 0.03em;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    font-weight: normal;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  :root {
    --black: #141414;
    --primary-normal: #235699;
    --primary-light: #ceeeff;
    --primary-dark: #102847;
    --secondary-normal: #80c9d3;
    --border-rounded: 20px;
    --border-sharped: 4px;
    --primary-dark: #102847;
    --h1: 60px;
    --h2: 48px;
    --h3: 36px;
    --h4: 24px;
    --p: 16px;
    --bp-largest: 75em; /* 1200px */
    --bp-large: 62.5em; /* 1000px */
    --bp-medium: 50em; /* 800px; */
    --bp-small: 37.5em; /* 600px; */
  }
`

export default GlobalStyle
