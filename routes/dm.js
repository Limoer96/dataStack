var express = require('express');
var router = express.Router();
var BehaviorsData = require('../model/BehaviorsData');
const Knn = require('../dm/knn');

router.post('/get_score', (req, res) => {
	const { sId, eId, attendance, timeRate, publishCondition } = req.body.data;
	BehaviorsData.find({}, function(err, rows){
		if(err) {
			res.status(500).json({global: {error: 'Server Error~'}})
		}else {
			const knn = new Knn(50, rows);
			const cond = Number.parseFloat((Number(publishCondition)/7).toFixed(2));
			knn.measureDistences([Number(attendance), Number(timeRate), cond]);
			const result = knn.measureClass();
			res.json({global: {data: result}})
		}
	})
})

module.exports = router;