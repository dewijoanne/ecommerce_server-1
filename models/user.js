'use strict';
const { hashPassword } = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Oops! Enter username here!"
        },
        notNull: {
          msg: "Oops! Enter username here!"
        },
        isUnique(value) {
          return User.findOne({
            where: {
              username: value
            }
          })
            .then((result) => {
              if (result) {
                throw new Error("Yikes! Username already exists!")
              }
            })
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Oops! Enter email here!"
        },
        notNull: {
          msg: "Oops! Enter email here!"
        },
        isEmail: {
          args: true,
          msg: "Oops! Invalid email format!"
        },
        isUnique(value) {
          return User.findOne({
            where: {
              email: value
            }
          })
            .then((result) => {
              if (result) {
                throw new Error("Yikes! Email address already exists!")
              }
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Oops! Enter password here!"
        },
        len: {
          args: [6, 999999],
          msg: "Yikes! Minimum 6 characters!"
        },
        notNull: {
          msg: "Oops! Enter password here!"
        }
      }
    },
    role: { type: DataTypes.STRING }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = hashPassword(user.password)
      }
    },
    sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Product)
  };
  return User;
};