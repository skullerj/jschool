import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'
import qs from 'querystring'
const styles = css`
  display: flex;
  flex-direction: row;
`
const linkStyles = (selected) => css`
  height: 24px;
  width: 24px;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  ${plutoFont('regular', 14)};
  color: ${selected ? '#fff' : theme.meTextColor};
  border-radius: 50%;
  background: ${selected ? theme.accentColor : 'transparent'};
`

class PageSelector extends Component {
  render () {
    const { total } = this.props
    const page = this.props.page || 1
    const links = []
    for (let i = 1; i <= Math.ceil(total / 15); i += 1) {
      links.push(<span className={linkStyles(i === page)} onClick={(e) => this.updateUrl(i)} key={i} selected={i === page} >{i}</span>)
    }
    return (<div className={styles}>
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

export default withRouter(PageSelector)
