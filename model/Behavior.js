var mongoose = require('./db');

var behaviorSchema = mongoose.Schema({
	s_id: { type: Number, required: true },
	name: { type: String, required: true },
	behaviors: [{
		e_id: { type: Number, required: true },
		operating_category: { type: Number, required: true }, // 操作类别：1. 实验预约，2. 实验学习，3. 成果提交
		start_time: { type: Date, default: Date.now },
		end_time: { type: Date }
	}]
})

const Behavior = mongoose.model('Behavior', behaviorSchema);

module.exports = Behavior;

