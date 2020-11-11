"use strict"

const { User } = require("../models")
const { verifyToken } = require("../helpers/jwt")
const createError = require("http-errors")

function authentication(req, res, next) {
    try {
        const decoded = verifyToken(req.headers.token)
        User.findOne({
            where: {
                id: decoded.id
            }
        })
            .then((user) => {
                if (user) {
                    req.user = {
                        id: user.id,
                        username: user.username,
                        role: user.role
                    }
                    next()
                } else {
                    next(createError(404, "Oh no! User is not found!"))
                }
            }).catch((err) => {
                next(createError(err))
            });
    } catch (err) {
        next(err)
    }
}

module.exports = authentication
