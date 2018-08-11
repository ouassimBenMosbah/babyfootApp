import mongoose, { Schema } from 'mongoose';

mongoose.promise = Promise;

// Define teamSchema
const teamSchema = new Schema({
  users: {
    type: [Schema.ObjectId], unique: true, required: true, ref: 'User',
  },
});

// Define schema methods
teamSchema.methods = {};

// Define hooks for pre-saving
teamSchema.pre('save', (next) => {
  if (!this.users || this.users.length === 0) {
    console.log('models/team.js =======NO USERS PROVIDED=======');
    next();
  } else {
    next();
  }
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
