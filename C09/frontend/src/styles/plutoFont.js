import { css } from 'emotion'
const typeToFontMap = new Map([
  ['regular', 'Pluto Sans Regular'],
  ['medium', 'Pluto Sans Medium'],
  ['cond_bold', 'Pluto Sans Cond Bold'],
  ['cond_regular', 'Pluto Sans Cond Regular'],
  ['cond_medium', 'Pluto Sans Cond Medium'],
  ['cond_light', 'Pluto Sans Cond Light']
])
const plutoFont = (type, size) => {
  return css`
    font-family: ${typeToFontMap.get(type)}, sans-serif;
    font-size: ${size || 16}px;`
}
export default plutoFont
