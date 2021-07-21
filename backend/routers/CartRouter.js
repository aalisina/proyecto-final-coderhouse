const express = require('express');
const { CartController } = require('../controllers');
const { CartValidator } = require('../validators');

const router = express.Router();

router.get('/', CartController.getUserCart);
router.post('/', CartValidator.create, CartController.create);
router.patch('/', CartValidator.update, CartController.update);
router.delete('/', CartController.delete);

module.exports = router;
