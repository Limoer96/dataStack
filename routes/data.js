var express = require('express');
var router = express.Router();
var Experiment = require('../model/Experiment');
var Behavior = require('../model/Behavior');
var Student = require('../model/User');

router.get('/experiments/count', (req, res) => {
	Experiment.find({}, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: "Server Error"}})
		}else {
			const data = [];
			for(let experiment of rows) {
				data.push(experiment.place_id);
			}
			res.json({global: {data: data}})
		}
	})
})
router.get('/experiments', (req, res) => {
	Experiment.find({}, function(error, rows){
		if(error) {
			res.status(500).json({global: {error: "Server Error"}})
		}else {
			res.json({global: {data: rows}})
		}
	})
})


router.get('/users', (req, res) => {
	Student.find({}, function(error, rows){
		if(error) {
			res.status(500).json({global: {error: "Server Error"}})
		}else {
			res.json({global: {data: rows}})
		}
	})
})


router.get('/behaviors', (req, res) => {
	Behavior.find({}, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: "Server Error"}})
		}else {
			res.json({global: {data: rows}})
		}
	})
})

module.exports = router;