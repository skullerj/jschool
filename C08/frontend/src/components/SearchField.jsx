import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'emotion'
import theme from '../styles/theme'
import plutoFont from '../styles/plutoFont'

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
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.clearInput = this.clearInput.bind(this)
  }

  render () {
    return (
      <div className={style}>
        <i className='fas fa-search' />
        <input type='text' placeholder='Search...' value={this.state.value} onChange={this.handleChange} />
        {this.state.value && <i className='fas fa-times' onClick={this.clearInput} />}
      </div>
    )
  }

  clearInput () {
    this.setState({ value: '' })
    this.props.onValueChange('')
  }

  handleChange (e) {
    this.setState({ value: e.target.value })
    this.props.onValueChange(e.target.value)
  }
}

SearchField.propTypes = {
  onValueChange: PropTypes.func.isRequired
}

export default SearchField
