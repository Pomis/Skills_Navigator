var express = require('express');
var router = express.Router();

/* Проверка параметров */
router.post('/', (req, res, next) => {
	try {
		if (req.headers.authorization != null) {
			if (req.headers.authorization.length != 32) {
				res.send(400, "Маркер доступа неверной длины!")
			} else {
				new Promise((resolve, reject) => {
					// check user in db
					resolve(true)

				})	.then(ok => ok? next(): reject())
					.catch(err => res.send(401, "Не удалось авторизироваться"))
			}
		} 
		
		next()
	} catch (e) {
		res.send(500, "Внутренняя ошибка сервера")
	}
});

module.exports = router;
