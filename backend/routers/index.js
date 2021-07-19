const express = require('express');

const router = express.Router();

router.use('/users', require('./UserRouter'));
router.use('/signup', require('./SignupRouter'));
router.use('/login', require('./LoginRouter'));

module.exports = router;
