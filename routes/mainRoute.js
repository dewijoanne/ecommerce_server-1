const router = require('express').Router()
const mainController = require('../controllers/mainController')
const products = require('./products')
const errHandler = require('../middlewares/errHandler')

router.post('/login', mainController.login)
router.use('/products', products)
router.use(errHandler)

module.exports = router
