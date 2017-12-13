var mongoose = require('./db');

var experimentSchema = mongoose.Schema({
	e_id: { type: String, required: true },
	title: { type: String, required: true },
	content: { type: String, required: true },
	profession: { type: String, required: true }, // 开设专业
	place: { type: String, required: true }, // 上机地点
	place_id: { type: Number, required: true },
	time: { type: String, required: true }, // 上机时间
	capacity: { type: Number, required: true },
	is_end: { type: Boolean, required: true },
	menber: [{
		userId: { type: mongoose.Schema.Types.ObjectId, required: true },
		s_id: { type: Number, required: true },
		name: { type: String, required: true },
		is_complete: { type: Boolean, required: true, default: false },
		score: { type: Number, required: true, default: 0 }
	}]
})

var Experiment = mongoose.model('Experiment', experimentSchema);

module.exports = Experiment;

