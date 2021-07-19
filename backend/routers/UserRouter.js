const express = require('express');
const { UserController } = require('../controllers');
const { UserValidator } = require('../validators');

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/:id', UserValidator.getOne, UserController.getOne);
router.post('/', UserValidator.create, UserController.create);

module.exports = router;
