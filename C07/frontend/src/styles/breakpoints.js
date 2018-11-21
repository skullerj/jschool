import facepaint from 'facepaint'

const breakpoints = [425, 860, 1180, 1300]

export default facepaint(
  breakpoints.map(b => `@media (min-width:${b}px)`)
)
