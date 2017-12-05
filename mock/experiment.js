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
	const title='交换机认知与配置实验';
	console.log('项目名称：', title);
	const content = `1. 交换机认知：理解三层交换机的硬件组成，基本功能和工作原理；
	2. 交换机的配置：掌握三层交换机的基本配置方式，为交换机划分VLan，对VLan进行管理和访问控制；
	`;
	console.log('实验内容：', content);
	const profession = '14软件工程 计算机网络课程设计';
	console.log('开设专业及课程：', profession);
	const place = '计算机网络技术开发实验室(计算中心301)';
	console.log("开设地点：", place);
	const time = '每周四 17：30-21：30';
	console.log('开设时间：', time);
	const capacity = 70;
	console.log('课容量：', capacity);
	const is_end = false;
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
		time: time,
		capacity: capacity,
		is_end: is_end,
		menber: menber
	}
}

function insertIntoDB() {
	const data = mockExperiment();
	var experiment = new Experiment(data);
	experiment.save(function(err) {
		if(err) {
			console.log('插入实验失败');
		}else {
			console.log('插入实验成功');
		}
	})
}
const id = '5a2695c3025a35487ff06443';
function addOneMenber(_id, stu) {
	Experiment.findById(_id, function(err, experiment) {
		if(err) {
			console.log('插入用户失败');
		}else {
			let menber = experiment.menber;
			menber.addToSet({
				userId: stu._id,
				s_id: stu.s_id,
				name: stu.name
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


