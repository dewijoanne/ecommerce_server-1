'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Product extends Model { }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Oops! Enter name first!"
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Oops! Enter a description first!"
        },
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Oops! Enter image URL first!"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Ooops! Enter price first!"
        },
        min: {
          args: 1000,
          msg: "Yikes! Minimum price is Rp 1000"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Oops! Enter stock first!"
        }
      }
    },
    UserId: { type: DataTypes.INTEGER },
    category: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["Smartphones", "Gaming Consoles", "Gadget Accessories", "Gaming CDs", "Powerbank", "Wearable Devices"]],
          msg: "Oops! Enter category first!"
        }
      }
    }
  }, {
    sequelize
  });
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User)
  };
  return Product;
};