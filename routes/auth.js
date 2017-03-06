const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sha1 = require('sha1');


/* Авторизация */
router.post('/', (req, res, next) => {
	let mail = req.body.mail
	let passhash = req.body.passhash

	global.db.query("SELECT * FROM Users WHERE Users.mail = ? AND Users.passhash = ?", [mail, passhash])
		
		.then(user => { 
			if (user[0])
				res.send(200, {access_token: sha1(mail + passhash)})
			else 
				res.send(400, {error: "Неверные данные!"})
		})

		.catch(err => {
			console.log(err)
			if (err) res.send(500, err)
		})

  
});

module.exports = router;
