var Experiment = require('../model/Experiment');
var Student = require('../model/User');
var mongoose = require('mongoose');
var getStudents = require('../util/getstudent');
var readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

function genExperimentId() {
	let e_id = '';
	for(let i = 0; i < 6; i ++) {
		e_id += Math.round(Math.random() * 9);
	}
	return Number(e_id);
}


function mockExperiment() {
	console.log('----begin');
	const e_id = genExperimentId();
	console.log('编号：', e_id);
	const title='Web技术随堂实验';
	console.log('项目名称：', title);
	const content = `1. 掌握web开发技术，特别是HTML, CSS, JAVASCRIPT, AJAX等技术；
	2. 运用web技术开发一个web应用。
	`;
	console.log('实验内容：', content);
	const profession = '13软件工程 Web技术';
	console.log('开设专业及课程：', profession);
	const place = '计算机系统与虚拟技术开发实验室(计算中心311)';
	console.log("开设地点：", place);
	const place_id = 1;
	const time = '每周六 15：30-17：30';
	console.log('开设时间：', time);
	const capacity = 120;
	console.log('课容量：', capacity);
	const is_end = true;
	console.log('已结课：', is_end ? '是' : '否');
	const menber = [
		{
			userId: '5a261fb4b84e4c14498ada7a',
			s_id: 200914972147,
			name: '熊颖'
		}
	];
	console.log('课堂成员---');
	console.log('人数：', menber.length);
	console.log('第一个人名：', menber[0].name);
	console.log('该学号：', menber[0].s_id);
	console.log('课堂成员完毕---');
	console.log('----end');
	return {
		e_id: e_id,
		title: title,
		content: content,
		profession: profession,
		place: place,
		place_id: place_id,
		time: time,
		capacity: capacity,
		is_end: is_end,
		menber: menber
	}
}

function addattendance(count) {
	Experiment.findById('5a2e6cc1d5d7da4d981c69e6', function(err, experiment){
		let attendance = experiment.attendance;
		for(var i = 0; i < count; i++) {
			attendance.addToSet(Math.round(Math.random()*20)+40);
		}
		experiment.markModified('attendance');
		experiment.save();
	})
}
console.log('run!');
// addattendance(5);


function insertIntoDB() {
	const data = mockExperiment();
	var experiment = new Experiment(data);
	experiment.save(function(err) {
		if(err) {
			console.log('插入实验失败');
			console.log('err', err.message);
		}else {
			console.log('插入实验成功');
		}
	})
}

// insertIntoDB();


const id = '5a2f6ef9d635002635b0a6e7';
function addOneMenber(_id, stu) {
	Experiment.findById(_id, function(err, experiment) {
		if(err) {
			console.log('插入用户失败', err);
		}else {
			let menber = experiment.menber;
			menber.addToSet({
				userId: stu._id,
				s_id: stu.s_id,
				name: stu.name,
				score: Math.round(Math.random()*60) + 40
			})
			experiment.markModified('menber');
			experiment.save(function(err) {
				if(err) {
					console.log('插入实验成员失败~')
				}else {
					console.log('插入数据成功');
				}
			})
		}
	})
}

function addMenbers(data) {
	for(let i = 0; i < data.length; i++) {
		addOneMenber(id, data[i])
	}
}

rl.question('选择要插入的课堂成员数量', (value) => {
	let count = Number(value);
	console.log('开始插入数据------');
	console.time('插入数据耗时');
	getStudents(count, addMenbers);
	console.timeEnd('插入数据耗时');
	console.log('-------结束');
})


