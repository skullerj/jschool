import React from 'react'
import { NavLink } from 'react-router-dom'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'
import logo from '../images/logo.png'

const linksStyle = css`
  display: flex;
  flex-direction: column;
  padding: 40px;

  h1 {
    ${plutoFont('cond_regular', 13)};
    color: ${theme.onSidebarHeTextColor};
    text-transform: uppercase;
  }
`
const logoStyle = css`
  background: #fff;
  border-bottom: 1px solid ${theme.accentColor};
  display: flex;
  height: 80px;

  img {
    margin: auto
  }
`
const linkStyle = css`
  ${plutoFont('cond_light', 14)};
  color: ${theme.accentColor};
  margin-top: 26px;
  text-decoration: none;
  & :visited,
  & :hover {
    color: ${theme.accentColor};
    text-decoration: none;
  }
  i {
    margin-right: 16px;
  }
`
const activeLinkStyle = css`
  color: ${theme.onSidebarHeTextColor};
  & :visited,
  & :hover {
    color: ${theme.onSidebarHeTextColor};
    text-decoration: none;
  }
`

const Nav = () => {
  return (
    <React.Fragment>
      <div className={logoStyle}>
        <img src={logo} alt='Jobsity Logo' />
      </div>
      <div className={linksStyle}>
        <h1>Locations</h1>
        <NavLink to='/books' className={linkStyle} activeClassName={activeLinkStyle} exact>
          <i className='fas fa-globe' />
          <span>Everywhere</span>
        </NavLink>
        <NavLink to='/books/quito' className={linkStyle} activeClassName={activeLinkStyle}>
          <i className='fas fa-globe' />
          <span>Quito</span>
        </NavLink>
        <NavLink to='/books/cartagena' className={linkStyle} activeClassName={activeLinkStyle}>
          <i className='fas fa-globe' />
          <span>Cartagenta</span>
        </NavLink>
        <NavLink to='/books/medellin' className={linkStyle} activeClassName={activeLinkStyle}>
          <i className='fas fa-globe' />
          <span>Medellin</span>
        </NavLink>
        <NavLink to='/books/digital' className={linkStyle} activeClassName={activeLinkStyle}>
          <i className='fas fa-tablet-alt' />
          <span>Digital</span>
        </NavLink>
      </div>
    </React.Fragment>
  )
}

export default Nav
