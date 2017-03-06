'use strict'

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


/* Регистрация */
router.post('/', (req, res, next) => {
  let name = req.body.name
  let passhash = req.body.passhash
  let mail = req.body.mail

  global.db.query("SELECT COUNT(*) FROM Users WHERE Users.mail = ?", [mail])

  	.then(count => {
  		console.log("count: "+count[0]['COUNT(*)'])
  		if (count[0]['COUNT(*)']>0)
  			throw "Пользователь с таким email уже зарегистрирован"
  		return count[0]['COUNT(*)']==0
  	})

  	.then(canInsert => {
  		if (canInsert){
	  		global.db.query("INSERT INTO Users SET ?", {
		  		name: name,
		  		mail: mail,
		  		confirmed: false,
		  		passhash: passhash,
		  	})
	  	}
	})

  	.then(ok => {
  		if (ok) {
  			let mailOptions = {
			    from: '"Superb bot 👻" <snavibot@gmail.com>', // sender address
			    to: mail, // list of receivers
			    subject: 'Hello ✔', // Subject line
			    text: 'Hello world ?', // plain text body
			    html: '<b>Hello world ?</b>' // html body
			}
			transporter.sendMail(mailOptions)
  		}
  	})

  	.then(() => res.send(200, {access_token: "kek"}))

  	.catch(err => {
  		console.log(err)
  		res.send(400, {error: err})
  	})

  //res.send(200, {access_token: "kek"})
});

module.exports = router;
