import React, { Component } from 'react'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'
import { withRouter } from 'react-router-dom'
import qs from 'querystring'
const style = css`
  align-self: center;
  background: ${theme.bgColor};
  border: 1px solid ${theme.accentColor};
  border-radius: 36px;
  display: flex;
  height: 36px;
  padding: 8px 14px;

  input {
    background: ${theme.bgColor};
    border: 0;
    border-radius: 36px;
    color: ${theme.heTextColor};
    flex-grow: 1;
    ${plutoFont('regular', 14)};
    margin-left: 8px;
  }

  i {
    font-size: 18px;
  }
`

class SearchField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: qs.parse(props.location.search.replace('?', '')).title
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.clearInput = this.clearInput.bind(this)
  }

  render () {
    return (
      <div className={style}>
        <i className='fas fa-search' />
        <input type='text' placeholder='Search...' value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        {this.state.value && <i className='fas fa-times' onClick={this.clearInput} />}
      </div>
    )
  }

  clearInput () {
    this.setState({ value: '' })
    this.updateUrl('')
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.updateUrl(this.state.value)
    }
  }

  updateUrl (title) {
    const params = qs.parse(this.props.location.search.replace('?', ''))
    params.title = title
    if (!params.title) {
      delete params.title
    }
    this.props.history.replace(`${this.props.location.pathname}?${qs.stringify(params)}`)
  }

}

export default withRouter(SearchField)
