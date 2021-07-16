const express = require('express');

const router = express.Router();

router.use('/users', require('./UserRouter'));

module.exports = router;
