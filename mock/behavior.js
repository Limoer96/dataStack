const Behavior = require('../model/Behavior');
const getMenber = require('../util/getstudentbyexperimentid');

function genOneBehavior(experiment, user) {
	const s_id = user.s_id;
	const name = user.name;
	const behaviors = [
		{
			e_id: experiment.e_id,
			operating_category: 1, // 0 实验预约 1 常规学习 2 成果提交
			start_time: Date.now(),
			end_time: new Date(Date.now() + 1000 * 3600 * 2).getTime()
		}
	]
	return {
		s_id: s_id,
		name: name,
		behaviors: behaviors
	};
}
const id = '5a2695c3025a35487ff06443';
function addBehavior(experiment, user) {
	const data = genOneBehavior(experiment, user);
	var stuBehavior = new Behavior(data);
	stuBehavior.save(function(err) {
		if(err) {
			throw new Error(err.message);
		}else {
			console.log('插入一个用户行为成功');
		}
	})
}

function addBehaviors(experiment, menber) {
	console.log('开始为某个实验李璐用户行为');
	console.time('耗时');
	for(let i = 0; i < menber.length; i++) {
		addBehavior(experiment, menber[i]);
	}
	console.log('耗时');
}

getMenber(id, addBehaviors);


