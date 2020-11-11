"use strict"

const { Product } = require('../models')

class ProductController {
    static getAll(req, res, next) {
        Product.findAll({
            order: [['id', 'DESC']]
        })
            .then((product) => {
                res.status(200).json(product)
            })
            .catch(next);
    }
    static getAllProductAdmin(req, res, next) {
        Product.findAll({
            where: {
                UserId: req.user.id
            }
        })
            .then((product) => {
                res.status(200).json(product)
            })
            .catch(next);
    }
    static getOne(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((product) => {
                if (!product) {
                   throw ({ statusCode:404, message:'Oops! Product not Found!' })
                } else {
                    res.status(200).json(product)
                }
            }).catch(next);
    }
    static create(req, res, next) {
        const { name, description, image_url, price, stock, category } = req.body
        if (stock == "") {
            throw ({ statusCode:404, message:'Oops! Enter stock first!' })
        } else if (stock < 1) {
            throw ({ statusCode:404, message:'Minimum 1 stock!' })
        } else {
            Product.create({
                name,
                description,
                image_url,
                price,
                stock,
                category,
                UserId: req.user.id
            })
                .then((product) => {
                    res.status(201).json(product)
                }).catch(next);
        }
    }
    static update(req, res, next) {
        const { name, description, image_url, price, stock, category } = req.body
        Product.update({
            name,
            description,
            image_url,
            price,
            stock,
            category,
            updatedAt: new Date()
        }, {
            where: {
                id: req.params.id
            }
        })
            .then((product) => {
                if (!product[0]) {
                    throw ({ statusCode:404, message:'Oops! Product not Found!' })
                } else {
                    return Product.findOne({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then((product) => {
                            res.status(200).json(product)
                        })
                }
            }).catch(next);
    }
    static remove(req, res, next) {
        let result = null
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((product) => {
                result = product
                if (!product) {
                    throw ({ statusCode:404, message:'Oops! Product not Found!' })
                } else {
                    return Product.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => {
                            res.status(200).json(result)
                        })
                }
            }).catch(next);
    }
}

module.exports = ProductController