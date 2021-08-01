const express = require('express');
const { OrderController } = require('../controllers');
const { OrderValidator } = require('../validators');

const router = express.Router();

router.get('/', OrderController.getAllUserOrders);

module.exports = router;
