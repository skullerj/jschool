import React from 'react'
import InjectSheet from 'react-jss'

const styles = (theme) => ({
  button: {
    height: 36,
    font: theme.font('cond_regular', 14),
    background: (props) => props.raised ? theme.colors.accent : 'transparent',
    color: (props) => props.raised ? theme.colors.white : theme.colors.accent,
    'border-radius': 36,
    border: `1px solid ${theme.colors.accent}`
  }
})

const Button = ({ children, classes, raised, ...rest }) => {
  return <button className={classes.button} {...rest}>{children}</button>
}

export default InjectSheet(styles)(Button)
