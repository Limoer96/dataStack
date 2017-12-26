var express = require('express');
var router = express.Router();
var Experiment = require('../model/Experiment');
var Behavior = require('../model/Behavior');
var Student = require('../model/User');


const offsetWeek = Math.ceil((new Date().getTime() - new Date(2017, 8, 12).getTime())/(1000*60*60*24*7));
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

// 根据学生的学号获取学生上课的实验数据和成绩数据等
router.get('/s/info', (req, res) => {
	const { s_id } = req.query;
	Experiment.find({}, function(error, rows) {
		if(error) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			const returnData = [];
			for(const one of rows) {
				const menber = one.menber;
				for(const student of menber) {
					if(student.s_id === Number(s_id)) {
						console.log('run in there');
						returnData.push({
							e_id: one.e_id,
							title: one.title,
							is_end: one.is_end,
							place: one.place,
							s_id: student.s_id,
							name: student.name,
							score: student.score,
							is_complete: student.is_complete
						})
						break;
					}
				}
			}
			res.json({global: {data: returnData}})
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

router.get('/search_by_student_id', (req, res) => {
	const { s_id } = req.query;
	Student.find({s_id: s_id}, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else{
			res.json({global: {data: rows}})
		}
	})
})

router.get('/students_id_all', (req, res) => {
	Student.find({}, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			const data = [];
			for(const row of rows) {
				data.push(String(row.s_id));
			}
			res.json({global: {data: data}})
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

// 按星期周次获得数据

router.get('/experiments_by_day', (req, res) => {
	const { day } = req.query;
	Experiment.find({day_id: day}, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			res.json({global: {data: rows}})
		}
	})
})
// 获取某一天的行为数据

router.get('/behaviors/nowadays', (req, res) => {
	Behavior.find({}, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			const behaviors = [];
			const returnData = [];
			// 获取所有的学习行为，并且匹配当天的学习行为
			for(const one of rows) {
				const data = {
					name: one.name,
					s_id: one.s_id,
					behaviors: []
				}
				const now = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
				for(const behavior of one.behaviors) {
					const behaviorTime = new Date(behavior.start_time).getTime();
					if( behaviorTime> now && behaviorTime < now + 1000*60*60*24) {
						data.behaviors.push(behavior);
					}
				}
				if(data.behaviors.length > 0) {
					returnData.push(data);
				}
			}
			res.json({ global: { data: returnData }})
		}
	})
})

// 多条件的学生检索
router.post('/mult_search', (req, res) => {
	const { profession, grade, sex } = req.body.data;
	Student.find({profession: profession, sex: sex}, function(err, rows) {
		if(err) {
			res.status(500).json({global: {error: 'Server Error'}})
		}else {
			const data = [];
			for(const one of rows) {
				let stuGrade = new Date(one.date_of_admission).getFullYear();
				if(String(stuGrade) === grade) {
					data.push(one);
				}
			}
			res.json({global: {data: data}})
		}
	})
})



module.exports = router;