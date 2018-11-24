import { css } from 'emotion'
import mq from './mediaQueries'
import theme from './theme'
import plutoFont from './plutoFont'

export const appStyle = css`
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
  .search-terms {
    padding: 20px 0px 10px 44px;
    ${plutoFont('cond_light', 20)};
    color: ${theme.heTextColor};
  }
`
export const headerStyle = css`
  grid-area: header;
`
export const booksStyle = css`
  grid-area: bookshelf;
`
export const navStyle = showNav => {
  const displayClass = showNav ? 'flex' : 'none'
  return css`
    grid-area: nav;
    ${mq({
    'display': [displayClass, displayClass, 'flex', 'flex'],
    'position': ['fixed', 'fixed', 'relative', 'relative']
  })};
    height: 100%;
    min-height: 100vh;
    width: 240px;
    z-index: 100;
  `
}

// export default { appStyle, headerStyle, navStyle, booksStyle }
