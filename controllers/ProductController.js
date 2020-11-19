const {Product} = require('../models')

class ProductController {

    static getProducts(req,res,next) {
        Product.findAll()
            .then(products => {
                products.forEach(e => {
                    e.price =`Rp ${new Intl.NumberFormat('ID').format(e.price)}`
                });
                res.status(200).json({products})
            })
            .catch(err => {
                return next(err)
            })
    }
    
    static getProduct(req,res,next) {
        Product.findOne({where: {id : req.params.id}})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                return next(err)
            })
    }
    
    static postProduct(req,res,next) {
        
        const {name,image_url,price,stock,category} = req.body
        
        Product.create({name,image_url,price,stock,category})
            .then(product => {
                res.status(201).json(product)
            })
            .catch(err => {
                return next(err)
            })
    }

    static editProduct(req,res,next) {
        const {name,image_url,price,stock,category} = req.body
        Product.update({name,image_url,price,stock,category}, {where: {id: req.params.id}})
            .then(products => {
                res.status(200).json({ msg: "Successfully updated!"})
            })
            .catch(err => {
                return next(err)
            })
    }

    static deleteProduct(req,res,next) {
        Product.destroy({where: {id : req.params.id}})
            .then(products => {
                
                res.status(200).json({ msg: "Successfully deleted!" })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = ProductController
