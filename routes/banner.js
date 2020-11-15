const router = require('express').Router()
const BannerController = require('../controllers/BannerController')

const {authorizationBanner} = require('../middlewares/auth.js')

router.get('/', BannerController.getBanners)
router.post('/', BannerController.postBanner)

router.get('/:id', BannerController.getBanner)
router.put('/:id', authorizationBanner, BannerController.editBanner)
router.delete('/:id', authorizationBanner, BannerController.deleteBanner)

module.exports = router
