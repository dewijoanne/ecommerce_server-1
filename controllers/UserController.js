const {User} = require('../models')
const {compareBcrypt} = require('../helpers/bcrypt.js')
const {generateToken} = require('../helpers/jwt.js')

class UserController {
    static register(req,res,next) { 

        var userObj = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || null
        }
        User.create(userObj)
        .then(user => {
            res.status(201).json({email: user.email, message: 'Successfully registered'})
        })
        .catch(err => {
            return next(err)
        })
    }

    static async login(req,res,next) {

        const {email,password} = req.body
        
        try {
            const user =  await User.findOne({where: {email}})

            if(!user) {
                throw {statusCode: 400, msg: "Register first!"}
            }

            const isValid = await compareBcrypt(password, user.password)
            
            if(isValid) {
                const access_token = generateToken(user)
                
                return res.status(200).json({id:user.id, email:user.email,role:user.role, access_token})
            } else {
                throw {statusCode: 400, msg: "Invalid username or password!"}
            }
            
        } catch(err) {
            return next(err)
        }
    }

}

module.exports = UserController