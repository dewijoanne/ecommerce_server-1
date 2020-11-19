const {Banner} = require('../models')

class BannerController {
    static getBanners(req,res,next) {
        Banner.findAll()
            .then(banners => {
                res.status(200).json(banners)
            })
            .catch(err => {
                return next(err)
            })
    }
    
    static getBanner(req,res,next) {
        Banner.findOne({where: {id : req.params.id}})
            .then(banner => {
                res.status(200).json(banner)
            })
            .catch(err => {
                return next(err)
            })
    }
    
    static postBanner(req,res,next) {
        const {title,status,image_url} = req.body
        Banner.create({title,status,image_url})
            .then(banner => {
                res.status(201).json(banner)
            })
            .catch(err => {
                return next(err)
            })
    }

    static editBanner(req,res,next) {
        const {title,status,image_url} = req.body
        Banner.update({title,status,image_url}, {where: {id: req.params.id}})
            .then(banner => {
                res.status(200).json({ msg: "Successfully updated!"})
            })
            .catch(err => {
                return next(err)
            })
    }

    static deleteBanner(req,res,next) {
        Banner.destroy({where: {id : req.params.id}})
            .then(banner => {
                
                res.status(200).json({ msg: "Successfully deleted!" })
            })
            .catch(err => {
                return next(err)
            })
    }

}

module.exports = BannerController