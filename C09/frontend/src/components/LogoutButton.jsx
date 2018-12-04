import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'

const buttonStyles = css`
    align-items: center;
    display: flex;
    max-width: 220px;
    min-width: 50px;
    width: 100%;
    height: 100%;

    .spacer {
      flex-grow: 1;
    }

    .logout-button {
      align-self: center;
      border: none;
      background-color: ${theme.accentColor};
      height: 36px;
      width: 80px;
      border-radius: 20px;
      ${plutoFont('cond_light', 16)};
      color: #fff;
    }
`

const LogoutButton = (props) => {
  const { authenticated, onLogout } = props
  if (authenticated) {
    return (
      <div className={buttonStyles}>
        <div className='spacer' />
        <button onClick={onLogout} className='logout-button'>Log out</button>
      </div>)
  } else {
    return null
  }
}

LogoutButton.propTypes = {
  authenticated: PropTypes.bool,
  onLogout: PropTypes.func
}

export default LogoutButton
