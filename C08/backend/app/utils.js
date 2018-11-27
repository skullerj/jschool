
function formatError (errorMessage, errorCode) {
  return { error: { message: errorMessage, status: errorCode } }
}

module.exports = { formatError }
