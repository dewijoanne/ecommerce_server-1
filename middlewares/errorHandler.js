"use strict"
module.exports = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).json(err.msg)
    }
    else if (err.status && err.message) {
        res.status(err.status).json({ message: err.message })
    }
    else if (err.message === "Yikes! Email or password is wrong!") {
        res.status(400).json({ message: err.errors[0].message })
    }
    else if (err.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Oops! No access for you!" })
    }
    else if (err.name === "CastError") {
        res.status(404).json("Oops! Dat not found")
    }
    else if (err.name === "SequelizeValidationError") {
        res.status(400).json({ message: err.errors[0].message })
    }
    else if (err.name === "ValidationError") {
        const arr = []
        err.errors.forEach(err => {
            arr.push({
                status: 400,
                msg: err.message
            })
        });
        res.status(400).json(arr)
    }
    else if (err.errors[0].message === "Oops! Email already exists!") {
        res.status(400).json({ message: err.errors[0].message })
    }
    else {
        res.status(500).json("Internal Server Error")
    }
}