import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import avatar from '../images/avatar.png'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'
import mq from '../styles/mediaQueries'

const avatarStyles = css`
    align-items: center;
    display: flex;
    max-width: 220px;
    min-width: 50px;
    width: 100%;
    height: 100%;

    .spacer {
      flex-grow: 1;
    }

    .divider {
      background-color: ${theme.meTextColor};
      height: 50px;
      margin-left: 20px;
      position: absolute;
      width: 1px;
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

const Avatar = (props) => {
  const { authenticated, onLogout } = props
  if (authenticated) {
    return (
      <div className={avatarStyles}>
        <div className='spacer' />
        <button onClick={onLogout} className='logout-button'>Log out</button>
      </div>)
  } else {
    return null
  }
}

Avatar.propTypes = {
  authenticated: PropTypes.bool,
  onLogout: PropTypes.func
}

export default Avatar
