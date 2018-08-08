import mongoose, { Schema } from 'mongoose';

mongoose.promise = Promise;

// Define matchSchema
const matchSchema = new Schema({
  teams: {
    type: [Schema.ObjectId],
    unique: false,
    required: true,
    ref: 'Team',
  },
  score: {
    type: [
      {
        idTeam: { type: Schema.ObjectId, required: true, ref: 'Team' },
        goals: { type: Number, required: false, unique: false },
      },
    ],
    unique: false,
    required: false,
  },
  date: { type: Date, unique: false, default: Date.now },
});

// Define schema methods
matchSchema.methods = {};

// Define hooks for pre-saving
matchSchema.pre('save', (next) => {
  if (!this.teams || this.teams.length !== 2) {
    console.log('models/match.js =======NOT THE GOOD NUMBER OF TEAMS PROVIDED=======');
    next();
  } else {
    next();
  }
});

const Match = mongoose.model('Match', matchSchema);
module.exports = Match;
