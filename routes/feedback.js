var express = require('express');
var router = express.Router();
var Feedback = require('../model/Feedback');

router.get('/add_star', (req, res) => {
	const one = new Feedback({
		email: '点赞用户',
		content: '点赞用户',
		star: true
	})
	one.save(function(err) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			Feedback.find({star: true}, function(err, rows){
			if(err) {
				res.status(500).json({global: {error: 'Server Error'}})
			}else {
				res.json({global: {data: {count: rows.length}}})
			}
			})
		}
	})
})

router.post('/add_feedback', (req, res) => {
	const { email, content } = req.body.data;
	const one = new Feedback({
		email: email,
		content: content
	})
	one.save(function(err) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			res.json({global: {data: 'OK!'}})
		}
	})
})

module.exports = router;