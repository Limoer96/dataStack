var mongoose = require('./db');

var userSchema = mongoose.Schema({
	s_id: { type: Number, required: true },
	name: { type: String, required: true }, 
	sex: { type: Number, required: true }, // 性别
	ethnic: { type: String, required: true },  // 民族
	date_of_birth: { type: Date, required: true }, // 出生日期
	native_place: { type: String, required: true },  // 籍贯
	political_status: { type: String, required: true }, // 政治面貌
	date_of_admission: { type: Date, required: true }, // 入学日期
	department: { type: String, required: true }, // 院系
	_class: { type: Number, required: true }, // 班级
	category: { type: String, required: true }, // 学生类别
	profession: { type: String, required: true }, // 专业
	contact_number: Number, // 联系电话，非必须
	discipline_categories: { type: String, required: true }, // 学科门类，例如工学等
	language: String // 外语语种
})

var User = mongoose.model('User', userSchema);

module.exports = User;

