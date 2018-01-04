var mongoose = require('./db');

var BehaviorsDataSchema = mongoose.Schema({
	attendance: { type: Number, required: true },
	timeRate: { type: Number, required: true },
	publishCondition: { type: Number, required: true },
	score: { type: Number, required: true }
})

var BehaviorsData = mongoose.model('BehaviorsData', BehaviorsDataSchema);

module.exports = BehaviorsData;