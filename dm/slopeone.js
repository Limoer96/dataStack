var ScoreData = require('../model/ScoreData');

class SlopeOne {
	constructor() {
		this.lists = [];
	}
	addLists(list) {
		this.lists.push(list);
	}
	// 构建以学生学号和实验编号为key的Map来保存数据

	// 构建以实验编号为key的Map
	getDataKeyItem() {
		const itemMap = new Map();
		for(const index in this.lists) {
			if(!itemMap.has(this.lists[index][1])){
				itemMap.set(this.lists[index][1], [])
			}
		}
		for(const item of this.lists) {
			const data = itemMap.get(item[1]);
			data.push([item[0], item[2]]);
			itemMap.set(item[1], data);
		}
		return itemMap;
	}

	// 构建以学号为key的Map
	getDataKeySid() {
		const sIdMap = new Map();
		for(const index in this.lists) {
			if(!sIdMap.has(this.lists[index][0])){
				sIdMap.set(this.lists[index][0], [])
			}
		}
		for(const item of this.lists) {
			const data = sIdMap.get(item[0]);
			data.push([item[1], item[2]]);
			sIdMap.set(item[0], data);
		}
		return sIdMap;
	}
	// 计算平均偏差
	computeAverageDiff(items, users, averages) {
		for(const item1 of items.keys()){
			for(const item2 of items.keys()) {
				let average = 0;
				let user_rank_all = 0;
				if(item1 !== item2) {
					for(const sId of 	users.keys()) {
						const scores = users.get(sId);
						const m = new Map(scores);
						if(m.has(item1) && m.has(item2)) {
							user_rank_all += 1;
							average += (Number.parseInt(m.get(item1), 10) - Number.parseInt(m.get(item2, 10)));
						}
					}
					if(user_rank_all !== 0) {
						var key = item1 +''+ item2;
						averages.push([key, average/user_rank_all]);
					}
				}
			}
		}
	}
	numbersWhoRankBoth(users, item1, item2) {
		let count = 0;
		for(let [ key, list ] of users) {
			let m = new Map(list);
			if(m.has(item1) && m.has(item2)) {
				count += 1;
			}
		}
		return count;
	}
	estimateRanking(users, items, averages, sId, eId) {
		let rankingCount = 0;
		let total = 0;
		let averageMap = new Map(averages);
		for(const list of users.get(sId)) {
			let count = this.numbersWhoRankBoth(users, list[0], eId);
			let pub = averageMap.get(list[0] + '' + eId) || 0;
			if(pub === 0) {
				continue;
			}
			total += (Number.parseInt(list[1])-pub) * count;
			rankingCount += count;
		}
		if(rankingCount === 0) {
			return 0;
		}
		return total / rankingCount;
	}
}

module.exports = SlopeOne;
