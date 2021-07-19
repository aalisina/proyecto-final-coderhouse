const express = require('express');

const router = express.Router();

router.use('/users', require('./UserRouter'));
router.use('/signup', require('./AuthRouter'));

module.exports = router;
