module.exports = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ error: { message: 'Unauthorized access.', status: 401 } });
  }
};