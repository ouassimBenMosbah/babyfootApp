import mongoose, { Schema } from 'mongoose';

const bcrypt = require('bcryptjs');

mongoose.promise = Promise;

// Define userSchema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },

  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },

  password: {
    type: String,
    unique: false,
    trim: true,
    required: true,
  },
});

// Define schema methods
userSchema.methods = {
  hashPassword: plainTextPassword => bcrypt.hashSync(plainTextPassword, 10),
  isValidPassword(password) { return bcrypt.compareSync(password, this.password); },
};

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
  this.password = this.hashPassword(this.password);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
