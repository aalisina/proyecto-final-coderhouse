const express = require('express');
const { ProductsController } = require('../controllers');
const { ProductsValidator } = require('../validators');

const router = express.Router();

router.get('/', ProductsController.getAll);
router.get('/:category', ProductsValidator.getProductsByCategory, ProductsController.getProductsByCategory);
router.post('/', ProductsValidator.create, ProductsController.create);
router.patch('/:id', ProductsValidator.update, ProductsController.update);
router.delete('/:id', ProductsValidator.delete, ProductsController.delete);

module.exports = router;
