import React, { Component } from 'react'
import { css } from 'emotion'
import mq from '../styles/mediaQueries'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'

const main = css`
  display: grid;
  ${mq({
    'grid-template-columns': [
      '1fr',
      '1fr',
      '240px 1fr',
      '240px 1fr'
    ],
    'grid-template-rows': [
      '160px 1fr',
      '160px 1fr',
      '160px 1fr',
      '80px 1fr'
    ],
    'grid-template-areas': [
      `'header' 'bookshelf'`,
      `'header' 'bookshelf'`,
      `'nav header' 'nav bookshelf'`,
      `'nav header' 'nav bookshelf'`
    ]
  })}
  .drawer-background {
    background: ${theme.hoverBackgroundColor};
    height: 100%;
    position: fixed;
    width: 100%;
    z-index: 2;
  }
`
const headerStyle = css`
  grid-area: header;
  min-height: 80px;
  background: ${theme.topBarBgColor};
  box-shadow: -1px 0 4px ${theme.topbarShadowColor};
  color: ${theme.heTextColor};
`
const contentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  grid-area: bookshelf;
`
const navStyle = showNav => {
  const display = showNav ? 'flex' : 'none'
  return css`
    grid-area: nav;
    ${mq({
    'display': [display, display, 'flex', 'flex'],
    'position': ['fixed', 'fixed', 'relative', 'relative'] })};
    
    @keyframes opendrawer {
      from {
        transform: translateX(-240px);
      }
  
      to {
        transform: none;
      }
    }
    animation-duration: 400ms;
    animation-name: opendrawer;
    animation-timing-function: cubic-bezier(0, 0, .2, 1);
    background: ${theme.sidebarColor};
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100vh;
    width: 240px;
    z-index: 100;
  `
}

const AppLayout = (props) => {
  const { appNav, appHeader, appContent, showNav, onNavToggle } = props
  return (
    <main className={main}>
      {showNav && <div className='drawer-background' onClick={onNavToggle} />}
      <nav className={navStyle(showNav)}>
        {appNav}
      </nav>
      <header className={headerStyle}>
        {appHeader}
      </header>
      <section className={contentStyle}>
        {appContent}
      </section>
    </main>
  )
}

export default AppLayout
