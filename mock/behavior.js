const Behavior = require('../model/Behavior');
const getMenber = require('../util/getstudentbyexperimentid');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

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

// getMenber(id, addBehaviors);



function addBehaviorsForUser(userid) {
		Behavior.findById(userid, function(err, user) {
			if(err) {
				throw new Error(err.message);
			}else {
				let behaviors = user.behaviors;
				const date = new Date(2016, Math.round(Math.random() * 10) + 1, Math.round(Math.random() * 29) + 1, Math.round(Math.random() * 13) + 9, Math.round(Math.random() * 59));
				const offset = (Math.round(Math.random() * 220) + 20) * 60 * 1000 // 学习时间是20分钟到240分钟不等
				behaviors.addToSet({
					e_id: behaviors[0].e_id,
					operating_category: Math.random()/8 > 0.1 ? 3 : 2,
					start_time: date.getTime(),
					end_time: new Date(date.getTime() + offset).getTime() 
				})
				user.markModified('behaviors');
				user.save(function(err) {
					if(err) {
						console.log('发生错误了');
					}else {
						// console.log('插入行为成功');
					}
				})
			}
		})
}

rl.question('输入待插入行为条数', (value) => {
	const count = Number(value);
	console.time('耗时');
	for(let i = 0; i < count; i++) {
		addBehaviorsForUser('5a269fe3a615da55391c5160');
	}
	console.timeEnd('耗时');
})









