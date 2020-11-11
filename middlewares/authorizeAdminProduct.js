"use strict"

const { Product } = require("../models")
const createError = require('http-errors')

function authorized(req, res, next) {
    Product.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(product => {
            if (!product) {
                next(createError(404, "Not found product"))
            } else if (product.UserId === req.user.id) {
                next()
            } else {
                next(createError(401, "Unauthorized"))
            }
        })
        .catch(next)
}

module.exports = authorized