const router = require('express').Router()
const ProductController = require('../controllers/productController')

const {authorizationProduct} = require('../middlewares/auth.js')

router.get('/', ProductController.getProducts)
router.post('/', ProductController.postProduct)

router.get('/:id', ProductController.getProduct)
router.put('/:id', authorizationProduct, ProductController.editProduct)
router.delete('/:id', authorizationProduct, ProductController.deleteProduct)

module.exports = router