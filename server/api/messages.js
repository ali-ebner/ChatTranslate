const router = require('express').Router()
const textTranslate = require('./translate')
module.exports = router

router.post('/', async (req, res, next) => {
	console.log('here')
	try {
		const text = req.body.text
		const target = req.body.target
		const translation = await textTranslate(text, target)
		console.log('translation', translation)
		res.json(translation)
	} catch (err) {
		next(err)
	}
})