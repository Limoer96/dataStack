var Student = require('../model/User');

function getStudents(num, cb) {
	Student.find({}, function(err, students) {
		if(err) {
			console.log('error happend~');
			throw new Error(err.message);
		}
		const count = students.length;
		let filter = count > num ? Math.round(Math.random() * (count - num - 1)) : 0;
		return cb(students.slice(filter, filter + num));
	})
}


module.exports = getStudents;


