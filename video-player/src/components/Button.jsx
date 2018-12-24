import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const buttonColor = (theme, props) => {
  let colors = {
    main: theme.colors.bg,
    secondary: theme.colors.text.blackHe
  };
  switch (props.variant) {
    case 'accent':
      colors = {
        main: theme.colors.accent,
        secondary: theme.colors.text.he
      };
      break;
    case 'error':
      colors = {
        main: theme.colors.error,
        secondary: theme.colors.text.he
      };
      break;
    default:
      break;
  }
  if (props.raised) {
    return {
      background: colors.main,
      color: colors.secondary
    };
  } else {
    return {
      background: 'transparent',
      color: colors.main
    };
  }
};

const styles = theme => ({
  button: props => ({
    ...theme.fonts.button,
    ...buttonColor(theme, props),
    padding: '0 0.5rem',
    border: '0',
    'border-radius': '0.5rem',
    height: '2rem',
    'min-width': '4rem',
    'text-align': 'center'
  })
});

const Button = props => {
  const { classes, children, raised, ...rest } = props;
  return (
    <button className={classes.button} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  raised: false,
  variant: 'normal'
};

Button.propTypes = {
  variant: PropTypes.string,
  raised: PropTypes.bool
};

export default injectSheet(styles)(Button);
