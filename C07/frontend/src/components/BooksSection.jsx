import React from 'react'
import PropTypes from 'prop-types'
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
  .error,
  .message {
    padding: 20px 0px 10px 44px;
    ${plutoFont('cond_light', 30)}
    color: ${theme.heTextColor};
    min-height: calc(100vh - 130px);
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
              ? <h1 className='message'>You are not logged in. Please do so.</h1>
              : props.children
      }
    </section>
  )
}

BooksSection.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  authenticated: PropTypes.bool
}

export default BooksSection
