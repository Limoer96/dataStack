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

router.get('/experiment', (req, res) => {
	const place_id = req.query.id;
	Experiment.find({place_id: place_id}, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		} else {
			res.json({global: {data: rows}});
		}
	})
})

router.get('/e', (req, res) => {
	const e_id = req.query.e_id;
	Experiment.find({e_id: e_id}, (err, experiment) => {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			res.json({global: {data: experiment[0]}})
		}
	})
})

router.get('/student', (req, res) => {
	const { s_id } = req.query;
	Student.find({s_id: s_id}, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			console.log(rows);
			res.json({global: {data: rows[0]}})
		}
	})
})

router.get('/s', (req, res) => {
	const { s_id } = req.query;
	Behavior.find({s_id: s_id }, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			res.json({global: {data: rows[0]}})
		}
	})
})


module.exports = router;