import React from 'react'
import InjectSheet from 'react-jss'

const styles = (theme) => ({
  container: {
    color: (props) => props.golden ? theme.colors.golden : theme.colors.accent,
    'font-size': 13,
    'letter-spacing': '-2 px',
    'margin-top': theme.spacing / 2
  }
})

const Stars = (props) => {
  const { score, classes } = props
  let stars = []
  for (let i = 1; i <= 5; i += 1) {
    if (i <= score) {
      stars.push(<i className='fas fa-star' key={i} />)
    } else {
      stars.push(<i className='far fa-star' key={i} />)
    }
  }
  return (
    <div className={classes.container}>
      {stars}
    </div>
  )
}

export default InjectSheet(styles)(Stars)
