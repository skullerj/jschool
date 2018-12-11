import React, { Component } from 'react'
import InjectSheet from 'react-jss'
import qs from 'querystring'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import Input from '../components/Input'

const styles = (theme) => ({
  container: {
    position: 'relative'
  },
  clear: {
    position: 'absolute',
    top: 10,
    right: 20,
    color: theme.colors.meText
  }
})

class SearchInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.clearInput = this.clearInput.bind(this)
  }
  render () {
    const { classes } = this.props
    const { value } = this.state
    return (
      <div className={classes.container}>
        <Input placeholder='Search...' value={value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} icon={<i className='fas fa-search' />} />
        {this.state.value && <i className={`fas fa-times ${classes.clear}`} onClick={this.clearInput} />}
      </div>
    )
  }
  clearInput () {
    this.setState({ value: '' })
    this.updateSearchTitle('')
  }
  handleChange (e) {
    this.setState({ value: e.target.value })
  }
  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.updateSearchTitle(this.state.value)
    }
  }
  updateSearchTitle (title) {
    const params = qs.parse(this.props.search.replace('?', ''))
    params.title = title
    if (!params.title) {
      delete params.title
    }
    this.props.push(`${this.props.pathname}?${qs.stringify(params)}`)
  }
}

const mapStateToProps = (state) => ({
  search: state.router.location.search,
  pathname: state.router.location.pathname
})

export default connect(mapStateToProps, { push })(InjectSheet(styles)(SearchInput))
