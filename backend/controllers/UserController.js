const { UserService } = require('../services');

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.getOne(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const newUser = await UserService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
