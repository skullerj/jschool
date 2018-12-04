import React from 'react'
import { css } from 'emotion'
import plutoFont from '../styles/plutoFont'
import theme from '../styles/theme'

const styles = css`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    ${plutoFont('cond_light', 72)}
    color: ${theme.heTextColor};
    margin-bottom: 20px;
  }
  h2 {
    ${plutoFont('cond_light', 36)};
    color: ${theme.leTextColor};
  }
`

const NotFoundPage = () => {
  return <div className={styles}>
    <h1>4 Oh! 4</h1>
    <h2>We couldn't find the page you are looking for.</h2>
  </div>
}

export default NotFoundPage
