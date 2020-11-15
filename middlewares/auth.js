const {jwtSign, jwtVerify} = require('../helpers/jwt')
const { User, Product } = require('../models')

function authentication ( req, res, next ) {
    try {
        // console.log(req.headers.access_token,"req.headers.access_token")
        req.userData = jwtVerify(req.headers.access_token)

        User.findByPk(req.userData.id)
        .then( data => {
            // console.log("masuk then")
            next()
        })
        .catch( err => {
            // console.log("masuk catch")
            return res.status(404).json({message: "user no longer exist"})
        })
    }catch {
        return res.status(401).json({message: "wrong access token"})
    }
}

function authorizationAdmin ( req, res, next ) {
    const userId = req.userData.id
    User.findByPk(userId)
    .then( data => {
        if( data ){
            if (!data) {
                throw {
                    name: "customErr",
                    message: "no user found",
                    status : 401,
                }
            } else if( data.role != "admin" ){
                throw {
                    name: "customErr",
                    message: "access only for admin",
                    status : 401,
                }
            } else {
                next()
            }
        } else {
            throw {
                name: "customErr",
                message: "not authorized",
                status : 401,
            }
        }
    })
    .catch( err => {
        next(err)
    })
}


module.exports = { authentication , authorizationAdmin }