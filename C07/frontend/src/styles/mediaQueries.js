import facepaint from 'facepaint'

const breakpoints = [425, 860, 1180, 1300]
const mq = facepaint(
  breakpoints.map(b => `@media (min-width:${b}px)`)
)
export default mq
