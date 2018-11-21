import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'
import logo from '../images/logo.png'

const navStyle = css`
  background: ${theme.sidebarColor};
  display: flex;
  flex-direction: column;
  
  .logo {
    background: #fff;
    border-bottom: 1px solid ${theme.accentColor};
    display: flex;
    height: 80px;

    img {
      margin: auto
    }
  }
  
  .links {
    display: flex;
    flex-direction: column;
    padding: 40px;
  }
`
const h1Style = css`
  ${plutoFont('cond_regular', 13)};
  color: ${theme.onSidebarHeTextColor};
  text-transform: uppercase;
`
const linkStyle = (linkLocation, selectedLocation) => css`
  ${plutoFont('cond_light', 14)};
  color: ${linkLocation === selectedLocation ? theme.onSidebarHeTextColor : theme.accentColor};
  margin-top: 26px;
  text-decoration: none;
  & :visited,
  & :hover {
    color: ${linkLocation === selectedLocation ? theme.onSidebarHeTextColor : theme.accentColor};
    text-decoration: none;
  }
  i {
    margin-right: 16px;
  }
`

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      location: 'everywhere'
    }
  }
  render () {
    const { location } = this.state
    return (
      <nav className={navStyle}>
        <div className='logo'>
          <img src={logo} alt='Jobsity Logo' />
        </div>
        <div className='links'>
          <h1 className={h1Style}>Locations</h1>
          <a href='/#' className={linkStyle('everywhere', location)} onClick={this.selectLocation.bind(this, 'everywhere')}>
            <i className='fas fa-globe' />
            <span>Everywhere</span>
          </a>
          <a href='/#' className={linkStyle('quito', location)} onClick={this.selectLocation.bind(this, 'quito')}>
            <i className='fas fa-globe' />
            <span>Quito</span>
          </a>
          <a href='/#' className={linkStyle('cartagena', location)} onClick={this.selectLocation.bind(this, 'cartagena')}>
            <i className='fas fa-globe' />
            <span>Cartagenta</span>
          </a>
          <a href='/#' className={linkStyle('medellin', location)} onClick={this.selectLocation.bind(this, 'medellin')}>
            <i className='fas fa-globe' />
            <span>Medellin</span>
          </a>
          <a href='/#' className={linkStyle('digital', location)} onClick={this.selectLocation.bind(this, 'digital')}>
            <i className='fas fa-tablet-alt' />
            <span>Digital</span>
          </a>
        </div>
      </nav>
    )
  }
  selectLocation (location) {
    this.setState({ location: location })
    this.props.onLocationChange(location)
  }
}

Nav.propTypes = {
  onLocationChange: PropTypes.func.isRequired
}

export default Nav
