import React, { Component } from 'react'
import PropTypes from 'prop-types'
import InjectSheet from 'react-jss'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'

const styles = (theme) => ({
  container: {
    display: 'flex',
    'flex-direction': 'row',
    '& .selected': {
      color: theme.colors.white,
      background: theme.colors.accent
    }
  },
  link: {
    height: 24,
    width: 24,
    'line-height': '24px',
    'text-align': 'center',
    cursor: 'pointer',
    font: theme.font('regular', 14),
    'border-radius': '50%',
    color: theme.colors.accent,
    background: 'transparent'
  }
})

class PageSelector extends Component {
  render () {
    const { total, classes } = this.props
    const page = this.props.page || 1
    const links = []
    for (let i = 1; i <= Math.ceil(total / 15); i += 1) {
      links.push(<span className={`${classes.link} ${page === i && 'selected'}`} onClick={(e) => this.updateUrl(i)} key={i} selected={i === page} >{i}</span>)
    }
    return (<div className={classes.container}>
      {links}
    </div>)
  }
  updateUrl (page) {
    const params = qs.parse(this.props.location.search.replace('?', ''))
    params.page = page
    this.props.history.replace(`${this.props.location.pathname}?${qs.stringify(params)}`)
  }
}

PageSelector.propTypes = {
  total: PropTypes.number,
  page: PropTypes.number
}

PageSelector.deafaultProps = {
  total: 0,
  page: 1
}

export default withRouter(InjectSheet(styles)(PageSelector))
