const { UserService } = require('../services');
const { comparePasswords, createToken } = require('../utils');

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
      if (!user) return res.status(404).json({ message: 'User not found.' });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  create: async (req, res) => {
    const { email } = req.body;
    try {
      const userExists = await UserService.getOneByEmail(email);
      if (userExists) res.status(400).json({ message: 'Cannot create user with this email.' });
      const newUser = await UserService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  update: async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
      const user = await UserService.getOne(id);
      if (!user) res.status(404).json({ message: 'User not found.' });
      const modifiedUser = await UserService.update(user, body);
      res.status(200).json(modifiedUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.getOne(id);
      if (!user) res.status(404).json({ message: 'User not found.' });
      await UserService.delete(id);
      res.status(204);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  signup: async (req, res) => {
    const { email } = req.body;
    try {
      const userExists = await UserService.getOneByEmail(email);
      if (userExists) res.status(400).json({ message: 'Cannot create user with this email.' });
      const newUser = await UserService.create(req.body);
      newUser.password = undefined;
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserService.getOneByEmail(email);
      if (!user) res.status(404).json({ message: 'Problem with credentials.' });
      const isValid = comparePasswords(user.password, password);
      if (!isValid) res.status(400).json({ message: 'Problem with credentials.' });
      const token = createToken(user);
      res.status(200).json({ message: 'Login succesfull.', token });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
