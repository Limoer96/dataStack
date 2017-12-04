var mongoose = require('mongoose');

var behaviorSchema = mongoose.Schema({
	s_id: { type: Number, required: true },
	name: { type: String, required: true },
	behaviors: [{
		e_id: { type: Number, required: true },
		operating_category: { type: Number, required: true }, // 操作类别：实验预约，实验学习，成果提交
		start_time: { type: Date, required: true, default: Date.now },
		end_time: { type: Date }
	}]
})
