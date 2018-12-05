const typeToFontMap = new Map([
  ['regular', 'Pluto Sans Regular'],
  ['medium', 'Pluto Sans Medium'],
  ['cond_bold', 'Pluto Sans Cond Bold'],
  ['cond_regular', 'Pluto Sans Cond Regular'],
  ['cond_medium', 'Pluto Sans Cond Medium'],
  ['cond_light', 'Pluto Sans Cond Light']
])
const fontGenerator = (type, size) => {
  return {
    family: typeToFontMap.get(type),
    size: size
  }
}
const mediaQueries = {
  xs: '@media screen and (max-widht:425px)',
  s: '@media screen and (min-width:425px)',
  m: '@media screen and (min-width:860px)',
  l: '@media screen and (min-width:1180px)',
  xl: '@media screen and (min-width:1300px)'
}
const colors = {
  bg: '#f5f6f8',
  // he: High Emphasis, me: Medium Emphasis, le: Low Emphasis
  heText: '#231f20',
  meText: '#484848',
  leText: '#aeaeae',
  header: {
    bg: '#fcf8f3'
  },
  drawer: {
    bg: '#231f20',
    heText: '#fff',
    meText: 'rgba(252, 248, 243, .7)'
  },
  hoverBg: 'rgba(35, 31 , 32, .8)',

  accent: '#6ec1e4',
  error: '#dc3545',
  white: '#fff',
  star: '#eec75a'
}

const mixins = {
  link: (color, visitedColor, font) => ({
    font,
    color: color,
    '&:visited, &:hover': {
      color: visitedColor,
      'text-decoration': 'none'
    },
    'text-decoration': 'none'
  })
}

const theme = {
  colors: colors,
  font: fontGenerator,
  // Media Queries
  mq: mediaQueries,
  spacing: 8,
  mixins
}
export default theme
