const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { Product } = require ('../models')

class ProductsController{
    static add(req,res, next){
        let newOne = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        }

        if( newOne.name == "" ){
            throw {
                name: "customErr",
                message: "name cannot be empty",
                status : 400,
            }
        } else if( newOne.image_url == "" ){
            throw {
                name: "customErr",
                message: "image_url cannot be empty",
                status : 400,
            }
        } else if ( newOne.price == "" ){
            throw {
                name: "customErr",
                message: "price cannot be empty",
                status : 400,
            }
        } else if( newOne.stock == ""){
            throw {
                name: "customErr",
                message: "stock cannot be empty",
                status : 400,
            }
        }else if ( typeof newOne.price != "number" || typeof newOne.stock != "number" ){
            throw {
                name: "customErr",
                message: "Price and Stock must be a Number",
                status : 400,
            }
        } else if ( newOne.price <= 0 || newOne.stock <= 0 ){
            throw {
                name: "customErr",
                message: "Price and Stock must be more then 0",
                status : 400,
            }
        }

        Product.create(newOne)
        .then( data => {
            return res.status(201).json(data)
        })
        .catch ( err => {

            return res.status(500).json(err)
        })

    }

    static view(req,res, next){
        Product.findAll()
        .then( data => {
            return res.status(200).json(data)
        })
        .catch ( err => {
            const errMsg = {
                name: "Internal Server Error",
                message: "Server Internal Error",
                status : 500,
            }
            return next(errMsg)
        })

    }

    static viewByPk(req,res, next){
        const selectedId = req.params.id
        Product.findByPk(selectedId)
        .then( data => {
            if(data == null){
                return res.status(404).json({ 
                    message: "data not found"
                })
            } else {
                return res.status(200).json(data)
            }
        })
        .catch ( err => {
            return res.status(500).json({ "message" : "internal server error"})
        })
    }

    static update(req,res, next){
        const selectedId = req.params.id

        let newData = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
        }

        if( newData.name == "" ){
            throw {
                name: "customErr",
                message: "name cannot be empty",
                status : 400,
            }
        } else if( newData.image_url == "" ){
            throw {
                name: "customErr",
                message: "image_url cannot be empty",
                status : 400,
            }
        } else if ( newData.price == "" ){
            throw {
                name: "customErr",
                message: "price cannot be empty",
                status : 400,
            }
        } else if( newData.stock == ""){
            throw {
                name: "customErr",
                message: "stock cannot be empty",
                status : 400,
            }
        }else if ( typeof newData.price != "number" || typeof newData.stock != "number" ){
            throw {
                name: "customErr",
                message: "Price and Stock must be a Number",
                status : 400,
            }
        } else if ( newData.price <= 0 || newData.stock <= 0 ){
            throw {
                name: "customErr",
                message: "Price and Stock must be more then 0",
                status : 400,
            }
        }

        Product.findByPk(selectedId)
        .then( data => {
            if ( data == null ) {
                throw {
                    name: "customErr",
                    message: "data not found",
                    status : 404,
                }
            } else {

                data.update(newData)
                .then ( updatedRow => {
                    res.status(201).json(data)
                })
                .catch ( err =>{
                    next(err)
                })
            }
            return res.status(200).json({ message: "Successfully updated!"})
        })
        .catch ( err => {
            return next(err)
        })
    }

    static delete(req,res, next){
        const selectedId = req.params.id
        Product.findByPk(selectedId)
        .then( data => {
            if(data == null){
                const errMsg = {
                    name: "customErr",
                    message: "data not found",
                    status : 404,
                }
                return next(errMsg)
            } else{
                data.destroy()
                .then( destroyedData => {
                    return res.status(200).json({ message: "Successfully deleted!"})
                })
                .catch ( err => {
                    const errMsg = {
                        name: "Internal Server Error",
                        message: "Server Internal Error",
                        status : 500,
                    }
                    return next(errMsg)
                    
                })
            }
        })
        .catch ( err => {
            const errMsg = {
                name: "Internal Server Error",
                message: "Server Internal Error",
                status : 500,
            }
            return next(errMsg)
        })
    }
}

module.exports = ProductsController
