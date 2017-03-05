var express = require('express');
var router = express.Router();

/* Проверка параметров */
router.post('*', (req, res, next) => {
	try {
		if (req.params.access_token != null
			req.params.access_token.length != 32)
			res.send(400, "Маркер доступа неверной длины!")

		next()
	} catch (e) {
		res.send(500, "Внутренняя ошибка сервера")
	}
});

module.exports = router;
