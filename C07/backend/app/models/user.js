const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String, required: [true, 'Username required.'], index: true, unique: true,
  },
  password: { type: String, required: [true, 'Password required.'] },
});

userSchema.methods.comparePassword = function compare(password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.hashPassword = function hash() {
  this.password = bcrypt.hashSync(this.password, 10);
};

module.exports = mongoose.model('user', userSchema);
