const express = require('express');

const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await new User(req.body).save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
