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
	global.db.query("DELETE FROM SkillsOfUser WHERE ?", { user_id: req.body.user_id })

		.then(() => {
			for (let skill of req.body.skills) {
					global.db.query("INSERT INTO SkillsOfUser SET ?", {
					skill_id: skill.skill_id,
					user_id	: req.body.user_id
				})
			}
		})

		.then(() => res.send(200, { error: "Всё нормально" }))
	
		.catch((err) => {
			console.log(err)
			res.send(400, err)
		})

	
})



module.exports = router;
