var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var Admin = require('../model/Admin');
var router = express.Router();

const SECRIT = 'LIMOER';
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth', function(req, res) {
	const { userName, password } = req.body.data;
	Admin.find({id: userName},function(err, admins) {
		if (err) {
			res.status(500).json({global: {error: 'Error~'}})
		}else {
			const admin = admins[0]; // 取得这个用户
			const result = bcrypt.compareSync(password, admin.password_hash);
			if(result) {
				const token = jwt.sign({
					id: admin.id
				}, SECRIT, {
					expiresIn: '1h'
				})
				res.json({global: {data: { message: 'ok!', token: token }}})
			}else {
				res.status(501).json({global: {error: '用户名或密码错误, 请重试'}})
			}
		}
	})
});

// token 的验证已经以中间件的形式写在了app.js里面了
router.post('/comfirm_token', (req, res) => {
	const { token } = req.body.data;
	jwt.verify(token, SECRIT, function(err, decoded){
		if(err) {
			res.status(501).json({global: {error: 'INvalid token'}})
		}else {
			res.json({global: {data: 'ok!'}});
		}
	})
})

module.exports = router;
