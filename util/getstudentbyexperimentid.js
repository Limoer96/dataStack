const Experiment = require('../model/Experiment');

function getMenber(id, cb) {
	Experiment.findById(id, function(err, experiment) {
		if(err) {
			throw new Error(err.message);
		}else {
			const menber = experiment.menber;
			cb(experiment, menber);
		}
	})
}

module.exports = getMenber;