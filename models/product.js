'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name is required!`,
        },
      },
    },
    image_url: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Image Url is required!`,
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `Price is required!`,
        },
        min: {
          args: [0],
          msg: 'Price may not set less than 0'
        }
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: `Stock is required!`,
        },
        min: {
          args: [0],
          msg: 'Stock may not set less than 0'
        }
      },
    },
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    hooks: {
      beforeCreate(product) {
        if (!product.category) {
          product.category = 'Unknown'
        }
      }
    }
  });
  return Product;
};