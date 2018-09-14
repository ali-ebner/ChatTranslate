const router = require('express').Router()
const textTranslate = require('./translate')
module.exports = router

router.post('/', (req, res, next) => {
	try {
		const text = req.body.text
		const target = req.body.target
		const translation = textTranslate(text, target)
		res.json(translation)
	} catch (err) {
		next(err)
	}
})