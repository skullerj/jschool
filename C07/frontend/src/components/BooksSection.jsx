import React from 'react'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'

const styles = css`
  max-height: calc(100vh - 80px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .loading,
  .error {
    padding: 20px 0px 10px 44px;
    ${plutoFont('cond_light', 30)}
    color: ${theme.heTextColor};
    min-height: calc(100vh - 130px);
  }
  .login-button {
    align-self: center;
    border: none;
    background-color: ${theme.accentColor};
    height: 40px;
    width: 80px;
    border-radius: 20px;
    ${plutoFont('cond_light', 20)}
  }
`

const BooksSection = (props) => {
  const { styles: parentStyles } = props

  return (
    <section className={css`${parentStyles} ${styles};`}>
      {
        props.error
          ? <h1 className='error'>There was an error fetching the Books. Try again later.</h1>
          : props.loading
            ? <h1 className='loading'>Loading ...</h1>
            : !props.authenticated
              ? <button onClick={props.onLoginClick} className='login-button'>Log in</button>
              : props.children
      }
    </section>
  )
}

export default BooksSection
