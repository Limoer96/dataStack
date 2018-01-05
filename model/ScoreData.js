var mongoose = require('./db');

var ScoreDataSchema = mongoose.Schema({
	eId: { type: Number, required: true },
	sId: { type: Number, required: true },
	score: { type: Number, required: true }
})

var ScoreData = mongoose.model('ScoreData', ScoreDataSchema);

module.exports = ScoreData;


