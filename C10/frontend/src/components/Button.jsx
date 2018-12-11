import React from 'react'
import InjectSheet from 'react-jss'
import PropTypes from 'prop-types'

const styles = (theme) => ({
  button: {
    height: 36,
    font: theme.font('cond_regular', 14),
    background: (props) => props.raised ? theme.colors.accent : 'transparent',
    color: (props) => props.raised ? theme.colors.white : theme.colors.accent,
    'border-radius': 36,
    border: `1px solid ${theme.colors.accent}`,
    width: (props) => props.width || 'inherit'
  }
})

const Button = ({ children, classes, raised, ...rest }) => {
  return <button className={classes.button} {...rest}>{children}</button>
}

Button.propTypes = {
  raised: PropTypes.bool,
  children: PropTypes.node,
  width: PropTypes.number
}

export default InjectSheet(styles)(Button)
