
function formatError (errorMessage, errorCode, extraFilds = {}) {
  return { error: { message: errorMessage, status: errorCode, ...extraFilds } }
}

function validateReturnDate (date) {
  try {
    date = new Date(date)
  } catch (e) {
    return false
  }
  const limitDateTime = (new Date()).getTime() + 1000 * 60 * 60 * 24 * 15
  return date.getTime() <= limitDateTime
}

module.exports = { formatError, validateReturnDate }
