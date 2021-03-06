import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DayPicker from 'react-day-picker'
import { css } from 'emotion'
import theme from '../styles/theme'
import mq from '../styles/mediaQueries'
import plutoFont from '../styles/plutoFont'
import { locations } from './Book'
import book from '../types/book'

import 'react-day-picker/lib/style.css'

const styles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${mq({ 'max-height': ['inherit', 'inherit', 'calc(100vh - 160px)', 'calc(100vh - 111px)'] })}
  overflow: hidden;
  h1 {
    ${plutoFont('cond_bold', 24)};
    color: ${theme.heTextColor};
    margin-bottom: 30px;
  }
  h2 {
    ${plutoFont('cond_light', 20)};
    color: ${theme.meTextColor};
    margin-bottom: 30px;
    text-align: center;
    a {
      color: ${theme.accentColor};
      margin-top: 26px;
      text-decoration: none;
      & :visited,
      & :hover {
        color: ${theme.accentColor};
        text-decoration: none;
      }
    }
    
  }
  .locations {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 30px;
  }
  .date-picker {
    width: 308px;
    .date-legend {
      ${plutoFont('cond_light', 15)};
      text-align: center;
    }
  }
  .submit {
    background-color: ${theme.accentColor};
    color: #fff;
    border: 2px solid ${theme.accentColor};
    ${plutoFont('cond_light', 18)};
    text-align: center;
    height: 40px;
    width: 170px;
    border-radius: 20px;
    line-height: 40px;
  }
`
const locationStyles = (isSelected) => css`
  background-color: ${isSelected ? theme.accentColor : 'transparent'};
  color: ${isSelected ? '#fff' : theme.accentColor};
  border: 2px solid ${theme.accentColor};
  ${plutoFont('cond_light', 18)};
  text-align: center;
  height: 40px;
  width: 170px;
  border-radius: 20px;
  line-height: 40px;
  margin: 8px;
`
const datePickerStyles = css`
  ${plutoFont('cond_light', 18)};
  .DayPicker-Day.DayPicker-Day--selected {
    background-color: ${theme.accentColor};
  }
`

class ReservationForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedLocation: null,
      selectedDate: null
    }
    this.restrictedDays = { before: new Date(Date.now() + 1000 * 60 * 60 * 24), after: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15) }
    this.selectLocation = this.selectLocation.bind(this)
    this.selectDate = this.selectDate.bind(this)
    this.lendBook = this.lendBook.bind(this)
  }
  render () {
    const { book } = this.props
    const { selectedLocation, selectedDate } = this.state
    return (
      <section className={styles}>
        <h1>Lend this book</h1>
        <h2>Where?</h2>
        <div className='locations'>
          {
            book.availableLocations.map((l) => <span key={l} className={locationStyles(l === selectedLocation)} onClick={(e) => this.selectLocation(l)}>{locations.get(l)}</span>)
          }
        </div>
        {selectedLocation && selectedLocation !== 'digital' && <h2>Until?</h2>}
        <div className='date-picker'>
          {
            !selectedLocation
              ? null
              : selectedLocation === 'digital'
                ? <h2>You can't rent digital books. <br /> <a href={book.digitalLink} rel='external noopener noreferrer' target='_blank'>Try this link</a> </h2>
                : <div>
                  <p className='date-legend'>Select a date on the next 15 days: </p>
                  <DayPicker
                    className={datePickerStyles}
                    initialMonth={new Date()}
                    selectedDays={[selectedDate]}
                    onDayClick={this.selectDate}
                    disabledDays={[this.restrictedDays]}
                  />
                </div>
          }
        </div>
        {selectedLocation && selectedLocation !== 'digital' && selectedDate && <button className='submit' onClick={this.lendBook}>Lend</button>}
      </section>
    )
  }

  selectLocation (location) {
    this.setState({ selectedLocation: location })
  }
  selectDate (date, modifiers) {
    if (modifiers.disabled) return
    this.setState({ selectedDate: date })
  }
  lendBook () {
    this.props.onBookLend(this.state.selectedLocation, this.state.selectedDate)
  }
}

ReservationForm.propTypes = {
  book: book,
  onBookLend: PropTypes.func.isRequired
}

export default ReservationForm
