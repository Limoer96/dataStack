let regexp = /<div>([\u4E00-\u9FA5\uF900-\uFA2D]+)<\/div>/g;

var genUserName = function genUserName(raw1, raw2) {
	let result = [];
	let array;
	while((array = regexp.exec(raw1)) !== null) {
		result.push(array[1])
	}
	while((array = regexp.exec(raw2)) !== null) {
		result.push(array[1])
	}
	return result;
}

module.exports = genUserName;


// run
// console.time('耗时');
// genUserName(rawTwoWordsMaleUserName);
// genUserName(rawTwoWordsFemaleUserName);
// genUserName(rawThreeWordsMaleUserName);
// genUserName(rawThreeWordsFemaleUserName);
// console.timeEnd('耗时');