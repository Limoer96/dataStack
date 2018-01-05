var ScoreData = require('../model/ScoreData');
var Student = require('../model/User');

const EXPERIMENTSID = [428563, 922586, 602928, 345818, 724765, 879741, 245817]; // 7个实验

function AddOne(eId, sId, score) {
	const one = new ScoreData({
		eId: eId,
		sId: sId,
		score: score
	})
	one.save(function(err) {
		if(err) {
			console.log('插入本条数据失败')
		}
	})
}

const SIDS = []; // 将要使用的1000名学生的学号

Student.find({}, function(err, rows) {
	if(err) {
		console.log('读取学生学号不成功')
	}else {
		for(const one of rows) {
			SIDS.push(one.s_id);
		}
		console.time('耗时');
		mockCondition1(SIDS);
		mockCondition2(SIDS);
		mockCondition3(SIDS);
		mockCondition4(SIDS);
		console.timeEnd('耗时');
	}
})

// 成绩分为4类：优秀，良好， 一般， 及格与不及格 模拟比例为5%, 40%, 30%, 25%
// 取

function mockCondition1(students) {
	for( let i = 0; i < 50; i++) {
		for(const eId of EXPERIMENTSID) {
			const score = Math.round(Math.random() * 10 + 90);
			AddOne(eId, students[i], score);
		}
	}
}

function mockCondition2(students) {
	for( let i = 50; i < 450; i++) {
		for(const eId of EXPERIMENTSID) {
			const score = Math.round(Math.random() * 10 + 80);
			AddOne(eId, students[i], score);
		}
	}
}
function mockCondition3(students) {
	for( let i = 450; i < 750; i++) {
		for(const eId of EXPERIMENTSID) {
			const score = Math.round(Math.random() * 10 + 70);
			AddOne(eId, students[i], score);
		}
	}
}

function mockCondition4(students) {
	for( let i = 750; i < 1000; i++) {
		for(const eId of EXPERIMENTSID) {
			const score = Math.round(Math.random() * 20 + 50);
			AddOne(eId, students[i], score);
		}
	}
}


