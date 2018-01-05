var express = require('express');
var router = express.Router();
var BehaviorsData = require('../model/BehaviorsData');
var ScoreData = require('../model/ScoreData');
const Knn = require('../dm/knn');
const SlopeOne = require('../dm/slopeone');


router.post('/get_by_recent_record', (req, res) => {
	const { sId, eId } = req.body.data;
	ScoreData.find((err, rows) => {
		if(err) {
			res.status(500).json({global: {error: 'Server Error~'}})
		}else {
			const obj = new SlopeOne();
			for(const one of rows) {
				obj.addLists([one.sId, one.eId, one.score]);
			}
			const n = obj.getDataKeySid();
			const m = obj.getDataKeyItem();
		  let averages = [];
			obj.computeAverageDiff(m, n, averages);
			averages = new Map(averages);
			const score = obj.estimateRanking(n, m, averages, Number(sId), Number(eId));
			res.json({global:{data: score}})
		}
	})

})

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