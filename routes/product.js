"use strict"

const router = require('express').Router()
const productController = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorizeAdmin = require('../middlewares/authorizeAdmin')
const authorizeAdminProduct = require('../middlewares/authorizeAdminProduct')


router.get('/', productController.getAll)
router.get('/admin', authentication, productController.getAllProductAdmin)
router.get('/:id', productController.getOne)
router.post('/', authentication, authorizeAdmin, productController.create)
router.put('/:id', authentication, authorizeAdmin, authorizeAdminProduct,productController.update)
router.delete('/:id', authentication, authorizeAdmin, authorizeAdminProduct, productController.remove)

module.exports = router