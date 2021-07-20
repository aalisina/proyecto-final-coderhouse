const { Product } = require('../models');

module.exports = {
  getAll: () => Product.find(),
  getProductsByCategory: (category) => Product.find({ category }),
  create: (body) => new Product(body).save(),
  getOne: (id) => Product.findById(id),
  update: (product, body) => {
    Object.assign(product, body);
    return product.save();
  },
  delete: (id) => Product.findByIdAndDelete(id),
};
