module.exports = {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 8080,
  env: 'production',
  jwtSecret: process.env.JWT_SECRET,
};
