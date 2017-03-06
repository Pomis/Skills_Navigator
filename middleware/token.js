const express = require('express');
const router = express.Router();

/* Проверка параметров */
router.post('/', (req, res, next) => {
	try {
		if (req.headers.authorization) {
			if (req.headers.authorization.length != 40) {
				res.send(400, "Маркер доступа неверной длины!")
			} else {
				global.db.query("SELECT * FROM Users WHERE Users.access_token = ?", [req.headers.authorization])
					
					.then(user => {
						req.body.user_id = user[0].user_id
						return user[0]!=null
					})

					.then(ok => {
						if (ok)
							next()
						else
							throw "Неверные данные!"
					})

					.catch(err => res.send(401, err))
			}
		} 
		else
			next()
	} catch (e) {
		res.send(500, "Внутренняя ошибка сервера")
	}
});

module.exports = router;
