import React from 'react'
import { css } from 'emotion'

const starStyle = (color) => css`
  color: ${color};
  font-size: 13px;
  letter-spacing: -2px;
  margin-top: 8px;
`

const BookStars = (props) => {
  const { score, color } = props
  let stars = []
  for (let i = 1; i <= 5; i += 1) {
    if (i <= score) {
      stars.push(<i className='fas fa-star' key={i} />)
    } else {
      stars.push(<i className='fas fa-star' key={i} />)
    }
  }
  return (
    <div className={starStyle(color)}>
      {stars}
    </div>
  )
}

export default BookStars
