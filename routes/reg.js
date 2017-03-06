var express = require('express');
var router = express.Router();

/* Авторизация */
router.post('/', (req, res, next) => {
  let login = req.params.login
  let passhash = req.params.passhash
  let mail = req.params.mail
  let confirmed = req.params.confirmed


  res.send(200, {access_token: "kek"})
});

module.exports = router;
