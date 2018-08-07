const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('mongoose').model('User').schema;
mongoose.promise = Promise;

// Define teamSchema
const teamSchema = new Schema({
	users: { type: [User], unique: true, required: true }
});

// Define schema methods
teamSchema.methods = {};

// Define hooks for pre-saving
teamSchema.pre('save', function (next) {
	if (!this.users || this.users.length === 0) {
		console.log('models/team.js =======NO USERS PROVIDED=======');
		next();
	} else {
		next();
	}
})

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;