const express = require('express');
const router = express.Router();

/* Получение полного списка ключевых навыков */
router.get('/', (req, res, next) => {

	global.db.query("SELECT * FROM Subjects JOIN Skills ON Subjects.subject_id = Skills.subject_id")

		.then(skills => res.send(200, skills))

		.catch(err => console.log(400, err))
	
})

/* Отправление списка навыков, которые выбрал пользователь */
router.post('/', (req, res, next) => {
	
})



module.exports = router;
