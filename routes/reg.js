'use strict'

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sha1 = require('sha1');

/* Подтверждение почтового адреса */
router.get('/:token', (req, res, next) => {
  global.db.query("UPDATE Users SET confirmed = 1 WHERE access_token=? ", [req.params.token])
    .then(res.send(200, "Адрес электронной почты успешно подтверждён"))
})

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
        let access_token = sha1(name + passhash)
        global.db.query("INSERT INTO Users SET ?", {
          name: name,
          mail: mail,
          confirmed: false,
          passhash: passhash,
          access_token: access_token
        })
        return access_token
      }
    })

    .then(access_token => {
      if (access_token) {
        let mailOptions = {
          from: '"Superb bot " <snavibot@gmail.com>', 
          to: mail, 
          subject: 'Приветствую в системе Skills Navigator!', 
          text: 'Пожалуйста, подтвердите ваш почтовый адрес', 
          html: 'Пожалуйста, подтвердите ваш почтовый адрес, перейдя по ссылке: http://localhost:9999/reg/'+access_token 
      }
      global.transporter.sendMail(mailOptions)
      }
    })

    .then(() => res.send(200, {error: "Всё норм"}))

    .catch(err => {
      console.log(err)
      res.send(400, {error: err})
    })

  //res.send(200, {access_token: "kek"})
});

module.exports = router;
