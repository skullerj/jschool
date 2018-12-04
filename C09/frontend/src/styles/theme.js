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
const theme = {
  bgColor: '#f5f6f8',
  headerColor: '#fcf8f3',
  drawerColor: '#231f20',
  hoverBackgroundColor: 'rgba(35, 31 , 32, .8)',

  accentColor: '#6ec1e4',
  errorColor: '#dc3545',
  // he: High Emphasis, me: Medium Emphasis, le: Low Emphasis
  heTextColor: '#231f20',
  meTextColor: '#484848',
  leTextColor: '#aeaeae',
  ondrawerHeTextColor: '#fff',
  ondrawerMeTextColor: 'rgba(252, 248, 243, .7)',
  starColor: '#eec75a',
  font: fontGenerator
}
export default theme
