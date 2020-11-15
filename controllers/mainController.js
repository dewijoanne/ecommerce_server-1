const { jwtSign , jwtVerify} = require('../helpers/jwt')
const { encrypt, comparePass } = require('../helpers/bcrypt')
const { User } = require ('../models')

class MainController{
    static login ( req, res, next ){
        const loginData  = {
            email : req.body.email,
            password : req.body.password,
        }
        if(!loginData.email || loginData.email == "" ){
            throw {
                name: "customErr",
                message: "email cannot be empty",
                status : 400,
            }
        } else if(!loginData.password || loginData.password == ""){
            throw {
                name: "customErr",
                message: "password cannot be empty",
                status : 400,
            }
        }
        
        User.findOne ({ where : { email : loginData.email }})
        .then( result => {
            if( comparePass(loginData.password, result.password )) {
                const token = {
                    id: result.id,
                    email: result.email,
                }
                const access_token = jwtSign(token)
                return res.status(200).json({
                    access_token: access_token,
                    id: result.id
                })
            } else {
                throw {
                    name: "customErr",
                    message: "data not found",
                    status : 404,
                }
            }
        })
        .catch( err => {
            let errMsg = {
                name: "customErr",
                message: "data not found",
                status : 404,
            }
            next(errMsg)
        })
    }
}

module.exports = MainController