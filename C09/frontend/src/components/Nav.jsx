import React from 'react'
import { NavLink } from 'react-router-dom'
import injectSheet from 'react-jss'
import logo from '../images/logo.png'

const styles = (theme) => ({
  '@keyframes opendrawer': {
    from: {
      transform: 'translateX(-240px)'
    },
    to: {
      transform: 'none'
    }
  },
  nav: {
    grid: {
      area: 'drawer'
    },
    display: (props) => props.opened ? 'flex' : 'none',
    position: 'fixed',
    [theme.mq.m]: {
      position: 'relative',
      display: 'flex !important'
    },
    animation: {
      name: 'opendrawer',
      duration: '400ms',
      timingFunction: 'cubic-bezier(0, 0, .2, 1)'
    },
    width: 240,
    height: '100vh',
    'z-index': '100',
    flex: {
      direction: 'column'
    }
  },
  logo: {
    background: theme.colors.white,
    border: {
      bottom: `1px solid ${theme.colors.accent}`
    },
    display: 'flex',
    height: theme.spacing * 10,
    '& img': {
      margin: 'auto'
    }
  },
  linksContainter: {
    background: theme.colors.drawer.bg,
    display: 'flex',
    flex: {
      direction: 'column',
      grow: 1
    },
    padding: theme.spacing * 5
  },
  link: {
    ...theme.mixins.link(theme.colors.accent, theme.colors.accent, theme.font('cond_light', 14)),
    '& i': {
      'margin-right': 16
    },
    'margin-top': 16
  },
  activeLink: {
    ...theme.mixins.link(theme.colors.drawer.heText, theme.colors.drawer.heText, theme.font('cond_light', 14)),
    '& i': {
      'margin-right': 16
    },
    'margin-top': 16
  },
  title: {
    font: theme.font('cond_light', 14),
    color: theme.colors.drawer.heText,
    'text-transform': 'uppercase'
  },
  drawerBackground: {
    background: theme.colors.hoverBg,
    height: '100%',
    width: '100%',
    position: 'fixed',
    'z-index': '2'
  }
})

const Nav = (props) => {
  const { classes } = props
  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <div className={classes.logo}>
          <img src={logo} alt='Jobsity Logo' />
        </div>
        <div className={classes.linksContainter}>
          <h1 className={classes.title}>Locations</h1>
          <NavLink to='/books' className={classes.link} activeClassName={classes.activeLink} exact>
            <i className='fas fa-globe' />
            <span>Everywhere</span>
          </NavLink>
          <NavLink to='/books/quito' className={classes.link} activeClassName={classes.activeLink}>
            <i className='fas fa-globe' />
            <span>Quito</span>
          </NavLink>
          <NavLink to='/books/cartagena' className={classes.link} activeClassName={classes.activeLink}>
            <i className='fas fa-globe' />
            <span>Cartagenta</span>
          </NavLink>
          <NavLink to='/books/medellin' className={classes.link} activeClassName={classes.activeLink}>
            <i className='fas fa-globe' />
            <span>Medellin</span>
          </NavLink>
          <NavLink to='/books/digital' className={classes.link} activeClassName={classes.activeLink}>
            <i className='fas fa-tablet-alt' />
            <span>Digital</span>
          </NavLink>
        </div>
      </nav>
      {props.opened && <div className={classes.drawerBackground} />}
    </React.Fragment>
  )
}

export default injectSheet(styles)(Nav)
