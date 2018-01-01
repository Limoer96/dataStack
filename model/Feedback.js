var mongoose = require('./db');

var feedbackSchema = mongoose.Schema({
	email: { type: String, required: true },
	content: { type: String, required: true },
	star: { type: Boolean, default: false }
})

var Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;