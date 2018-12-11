import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DayPicker from 'react-day-picker'
import InjectSheet from 'react-jss'
import { locations } from './Book'
import book from '../types/book'
import Button from './Button'
import 'react-day-picker/lib/style.css'

const styles = theme => ({
  container: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'start',

  },
  title: {
    font: theme.font('cond_bold', 36),
    color: theme.colors.heText
  },
  subtitle: {
    font: theme.font('cond_bold', 24),
    color: theme.colors.meText
  },
  location: {
    '& *': {
      margin: theme.spacing / 2
    }
  },
  datePickerContainer: {
    font: theme.font('cond_light', 16),
    '& .DayPicker-Day.DayPicker-Day--selected': {
      background: theme.colors.accent
    }
  },
  send: {
    width: 120
  }
})

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
    const { classes, book } = this.props
    const { selectedLocation, selectedDate } = this.state
    return (
      <section className={classes.container}>
        <h1 className={classes.title}>Lend this book</h1>
        <h2 className={classes.subtitle}>Where?</h2>
        <div className={classes.location}>
          {
            book.availableLocations.map((l) => <Button key={l} raised={l === selectedLocation} onClick={(e) => this.selectLocation(l)}>{locations.get(l)}</Button>)
          }
        </div>
        {selectedLocation && selectedLocation !== 'digital' && <h2 className={classes.subtitle}>Until?</h2>}
        <div className={classes.datePickerContainer}>
          {
            !selectedLocation
              ? null
              : selectedLocation === 'digital'
                ? <h2>You can't rent digital books. <br /> <a href={book.digitalLink} rel='external noopener noreferrer' target='_blank'>Try this link</a> </h2>
                : <div>
                  <p className='date-legend'>Select a date on the next 15 days: </p>
                  <DayPicker
                    className={classes.datePicker}
                    initialMonth={new Date()}
                    selectedDays={[selectedDate]}
                    onDayClick={this.selectDate}
                    disabledDays={[this.restrictedDays]}
                  />
                </div>
          }
        </div>
        {selectedLocation && selectedLocation !== 'digital' && selectedDate && <Button raised onClick={this.lendBook} width={120}>Lend</Button>}
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
    this.props.onBookLend(this.props.book.id, this.state.selectedLocation, this.state.selectedDate)
  }
}

ReservationForm.propTypes = {
  book: book,
  onBookLend: PropTypes.func.isRequired
}

export default InjectSheet(styles)(ReservationForm)
