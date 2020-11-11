"use strict"

function authorizeAdmin(req, res, next) {
    try {
        if (req.user.role === 'admin') {
            next()
        } else {
            throw ({
                status: 401,
                message: "Stop! You are not the admin!"
            })
        }
    } catch (err) {
        next({
            status: 401,
            message: "Stop! You are not the admin!"
        })
    }
}

module.exports = authorizeAdmin
