const router = require('express').Router()
const productRouter = require('./product')
const bannerRouter = require('./banner')

const {authentication} = require('../middlewares/auth.js')
const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.use('/products', productRouter)
router.use('/banners', bannerRouter)


module.exports = router

