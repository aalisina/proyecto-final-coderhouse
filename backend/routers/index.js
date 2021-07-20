const express = require('express');
const { verifyTokenUser, verifyTokenAdmin } = require('../middlewares');

const router = express.Router();

router.use('/users', verifyTokenAdmin, require('./UserRouter'));
router.use('/signup', require('./SignupRouter'));
router.use('/login', require('./LoginRouter'));
router.use('/products', require('./ProductsRoute'));

module.exports = router;
