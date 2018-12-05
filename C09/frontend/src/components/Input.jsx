import React from 'react'
import InjectSheet from 'react-jss'

const styles = (theme) => ({
  container: {
    position: 'relative',
    height: (props) => props.errorMessage ? '52px' : '36px',
    width: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'start'
  },
  inputContainer: {
    position: 'relative',
    width: '100%'
  },
  input: {
    background: theme.colors.bg,
    color: theme.colors.heText,
    width: '100%',
    height: 36,
    font: theme.font('regular', 14),
    'padding-left': (props) => props.input ? '16px ' : '32px',
    'border-radius': 36,
    border: (props) => props.invalid ? `1px solid ${theme.colors.error}` : `1px solid ${theme.colors.accent}`,
    '&:focus': {
      border: (props) => props.invalid ? `2px solid ${theme.colors.error}` : `2px solid ${theme.colors.accent}`,
      outline: 'none'
    },
    'box-sizing': 'border-box'
  },
  icon: {
    position: 'absolute',
    'font-size': 16,
    'z-index': 1,
    top: 10,
    left: 10,
    color: (props) => props.invalid ? theme.colors.error : theme.colors.meText
  },
  error: {
    padding: '4px 12px',
    font: theme.font('regular', 12),
    color: theme.colors.error
  }
})

const Input = ({ classes, errorMessage, icon, invalid, ...rest }) => {
  return (
    <div className={classes.container}>
      <div className={classes.icon}>
        {icon}
      </div>
      <div className={classes.inputContainer}>
        <input className={classes.input} {...rest} />
      </div>
      { errorMessage && <span className={classes.error}>{ invalid && errorMessage}</span>}
    </div>
  )
}
Input.defaultProps = {
  invalid: false,
  errorMessage: ''
}

export default InjectSheet(styles)(Input)
