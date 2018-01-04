var BehaviorsData = require('../model/BehaviorsData');

/*
	现在开始mock数据，单个数据项包含四个字段[出勤率，上课时间比率，作业提交情况，成绩]
	模拟数据1000条，其中成绩为优秀占5%，成绩良好的40%， 成绩一般的30%，及格占比20%，不及格人数为5%
	出勤率：出勤次数/上课次数
	上课时间比率：实际上课时间/课程要求课时
	作业提交情况：作业提前或者延后的天数/7
	成绩：百分制，优秀90-100， 良好80-89，一般70-79，及格60-69，不及格0-59
*/
function saveOne(attendance, timeRate, publishCondition, score) {
	const one = new BehaviorsData({
		attendance: attendance,
		timeRate: timeRate,
		publishCondition: publishCondition,
		score: score
	})
	one.save(function(err) {
		if(err) {
			console.log('插入一条数据失败');
		}
	})
}

function mockCondition1() {
	// 模拟优秀的同学, 出勤率 > 0.8, 0.9<上课时间比率<1.1, 作业提交情况 -3 - +1, 成绩90-100
	for(let i = 0; i < 50; i ++) {
		const attendance = (Math.random() * (1-0.8) + 0.8).toFixed(2);
		const timeRate = (Math.random() * 0.2 + 0.9).toFixed(2);
		const publishCondition = ((Math.round(Math.random() * 4) -3)/7).toFixed(2);
		const score = Math.round(Math.random() * 10 + 90);
		saveOne(Number(attendance), Number(timeRate), Number(publishCondition), score);
	}
}
function mockCondition2() {
	// 模拟良好的同学, 出勤率>0.8, 0.8<上课时间比率<1.1, 作业提交情况 -1-2, 成绩80-89
	for(let i = 0; i < 400; i ++) {
		const attendance = (Math.random() * (1-0.8) + 0.8).toFixed(2);
		const timeRate = (Math.random() * 0.3 + 0.8).toFixed(2);
		const publishCondition = ((Math.round(Math.random() * 3) -1)/7).toFixed(2);
		const score = Math.round(Math.random() * 10 + 80);
		saveOne(Number(attendance), Number(timeRate), Number(publishCondition), score);
	}
}

function mockCondition3() {
	// 模拟一般的同学，0.8>出勤率>0.7, 0.7<上课时间比率<0.9, 作业提交情况0-3, 成绩70-79
	for(let i = 0; i < 300; i ++) {
		const attendance = (Math.random() * (0.8-0.7) + 0.7).toFixed(2);
		const timeRate = (Math.random() * 0.2 + 0.7).toFixed(2);
		const publishCondition = ((Math.round(Math.random() * 3))/7).toFixed(2);
		const score = Math.round(Math.random() * 10 + 70);
		saveOne(Number(attendance), Number(timeRate), Number(publishCondition), score);
	}
}

function mockCondition4() {
	// 模拟及格的同学, 0.7>出勤率 > 0.6, 0.6 < 上课时间比率 < 0.8, 作业提交情况 3-7， 成绩60-69
	for(let i = 0; i< 200; i ++) {
		const attendance = (Math.random() * (0.7-0.6) + 0.6).toFixed(2);
		const timeRate = (Math.random() * 0.2 + 0.6).toFixed(2);
		const publishCondition = ((Math.round(Math.random() * 4 + 3))/7).toFixed(2);
		const score = Math.round(Math.random() * 10 + 60);
		saveOne(Number(attendance), Number(timeRate), Number(publishCondition), score);
	}
}

function mockCondition5() {
	// 模拟不及格的同学, 0<出勤率< 0.6, 0<上课时间比率<0.6, 作业提交情况 5-7， 成绩0-59
	for(let i = 0; i< 50; i ++) {
		const attendance = (Math.random() * (0.6) + 0.6).toFixed(2);
		const timeRate = (Math.random() * 0.6 + 0.6).toFixed(2);
		const publishCondition = ((Math.round(Math.random() * 2 + 5))/7).toFixed(2);
		const score = Math.round(Math.random() * 59 );
		saveOne(Number(attendance), Number(timeRate), Number(publishCondition), score);
	}
}
console.time('耗时');
mockCondition1();
mockCondition2();
mockCondition3();
mockCondition4();
mockCondition5();
console.timeEnd('耗时');