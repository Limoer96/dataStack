class Knn {
	constructor(k, simples) {
		this.k = k;
		this.simples = simples;
		this.distances = []; 
	}
  measureDistences(testSimple) {
  	for(const simple of this.simples) {
  		const a = testSimple[0] - simple.attendance;
  		const b = testSimple[1] - simple.timeRate;
  		const c = testSimple[2] - simple.publishCondition;
  		const distance = Math.sqrt(a*a + b*b + c*c);
  		this.distances.push([distance, simple.score]);
  	}
  	this.distances.sort((a, b) => {
  		return a[0] > b[0];
  	})
  }
  measureClass() {
  	// 学习成绩被分为优良中及格不及格五类
  	const distances = this.distances;
  	const result = [{
  		deg: '优秀',
  		score: []
  	},{
  		deg: '良好',
  		score: []
  	},{
  		deg: '一般',
  		score: []
  	},{
  		deg: '及格',
  		score: []
  	},{
  		deg: '不及格',
  		score: []
  	}];
  	for(let i = 0; i < this.k; i ++) {
  		const score = distances[i][1];
  		if(score >= 90) {
  			result[0].score.push(score);
  		}else if(score >=80 && score < 90) {
  			result[1].score.push(score); 
  		}else if(score >=70 && score < 80) {
  			result[2].score.push(score); 
  		}else if(score >=60 && score < 70) {
  			result[3].score.push(score); 
  		}else {
  			result[4].score.push(score); 
  		}
  	}
  	result.sort(function(a, b) {
  		return a.score.length < b.score.length;
  	});
  	return result[0];
  }
}

module.exports = Knn;

