const express = require('express');
const { verifyTokenUser, verifyTokenAdmin } = require('../middlewares');

const router = express.Router();

router.use('/users', verifyTokenAdmin, require('./UserRouter'));
router.use('/signup', require('./SignupRouter'));
router.use('/login', require('./LoginRouter'));

module.exports = router;
