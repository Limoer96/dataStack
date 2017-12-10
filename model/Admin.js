var mongoose = require('./db');

var adminSchema = mongoose.Schema({
	id: { type: String, required: true },
	password_hash: { type: String, required: true },
	last_login_time: { type: Date, required: true }
})

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;