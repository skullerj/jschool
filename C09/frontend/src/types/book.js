import PropTypes from 'prop-types'

const book = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  photoURL: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  digitalLink: PropTypes.string,
  returnDate: PropTypes.string,
  availableLocations: PropTypes.arrayOf(PropTypes.string).isRequired
})

export default book
