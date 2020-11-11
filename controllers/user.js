const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')
const { User } = require ('../models')


class UserController {
  static register(req, res, next) {
    const { email, password, username, role } = req.body
    User.create({
      username,
      email,
      password,
      role: role || 'customer'
    })

    .then((user) => {
      const token = generateToken(user.id)
      res.status(201).json({
        user, token
      })
    }).catch(next)
  }

  static login(req, res, next) {
    const { email, password } =req.body
    User.findOne({
      where: {
        email
      }
    })
    .then((user) => {
      if(user) {
        const payload= comparePassword(password, user.password)
        if(payload) {
          const token = createToken(user.id)
          res.status(200).json({
            user, token
          })
        } else {
          throw({ statusCode:404, message:'Wrong password or email!' })
        }
      } else {
        throw({ statusCode:404, message:'Wrong password or email!' })
      }
    }).catch(next)
  }
}

module.exports = UserController