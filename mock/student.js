const readline = require('readline');
const Student = require('../model/User');
const genUserName = require('../util/parseusername');
const statics = require('./static');

const maleNameList = genUserName(statics.rawTwoWordsMaleUserName, statics.rawThreeWordsMaleUserName);
const femaleNameList = genUserName(statics.rawTwoWordsFemaleUserName, statics.rawThreeWordsFemaleUserName);


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
function genStudentId(year) {
	let s_id = year + ''; // 转成字符串
	for(let i = 0; i<8; i++) {
		s_id += Math.floor(Math.random() * 10); // 后八位
	}
	return Number(s_id);
}

function genBirthday() {
	const year = 1990 + Math.round(Math.random() * 8);
	const month = Math.round(Math.random() * 11) + 1;
	const day = Math.round(Math.random()*26) + 1; // 这里不考虑大小年几月份等，所以折中一下；
	return new Date(year, month, day);
}

function genDateOfAdmission(timeStamp) {
	const date = new Date(timeStamp + 567648000000);
	return new Date(date.getFullYear(), 8, 1);
}

function mockStudents() {
	const rand = Math.round(Math.random()*6);
	// console.log('----begin');
	// console.time('共耗时');
	const sex = Math.round(Math.random());
	// console.log('性别', sex);
	const name = sex === 0 ? maleNameList[Math.round(Math.random()*1999)] : femaleNameList[Math.round(Math.random()*1999)];
	// console.log('姓名', name);
	const ethnic = Math.random()/9 > 0.1 ? statics.ethnic[Math.round(Math.random()*55)] : '汉族';
	// console.log('民族：', ethnic);
	const date_of_birth = genBirthday().getTime();
	// console.log('出生日期', date_of_birth);
	const native_place = statics.nativePlace[Math.round(Math.random() * 33)];
	// console.log('籍贯：', native_place);
	const date_of_admission = genDateOfAdmission(date_of_birth)
	// console.log('入学时间：', date_of_admission.getTime());
	const s_id = genStudentId(date_of_admission.getFullYear());
	// console.log('学号：', s_id);
	const department = statics.department[rand][0];
	// console.log('院系：', department);
	const _class = Math.ceil(Math.random() * 6);
	// console.log('班级：', _class);
	const discipline_categories = statics.department[rand][1];
	// console.log('门类：', discipline_categories);
	const profession = statics.department[rand][2];
	// console.log('专业：', profession);
	// console.log('-----end');
	const student = new Student({
		s_id: s_id,
		name: name,
		sex: sex,
		ethnic: ethnic,
		date_of_birth: date_of_birth,
		native_place: native_place,
		date_of_admission: date_of_admission.getTime(),
		department: department,
		_class: _class,
		profession: profession,
		contact_number: 18580748432,
		discipline_categories: discipline_categories,
		language: '英语'
	})
	student.save(function(err) {
		if(err) {
			console.log('插入数据失败')
		}else {
			// console.log('插入本条数据成功')
		}
		// console.timeEnd('共耗时');
	})
}

// mockStudents();

rl.question('输入模拟的用户数量:', (value) => {
	let count = Number(value);
	console.log(`将要插入${count}条, 开始-----------`);
	console.time('耗时');
	for(let i = 0; i < count; i ++) {
		mockStudents();
	}
	console.timeEnd('耗时');
	console.log(`完成插入学生信息数据, 结束-----------`);
})










