const { UserService } = require('../services');
const httpMap = require('../utils/httpMap');

const postUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const { status, data } = await UserService.createUser({ displayName, email, password, image });
  return res.status(httpMap(status)).json(data);
};

const getAllUsers = async (_req, res) => {
  const { status, data } = await UserService.getAllUsers();
  return res.status(httpMap(status)).json(data);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await UserService.getUserById(id);
  return res.status(httpMap(status)).json(data);
};

const deleteUser = async (_req, res) => {
  const { id } = res.locals.user;
  const { status } = await UserService.deleteUser(id);
  return res.status(httpMap(status)).end();
};

module.exports = {
  postUser,
  getAllUsers,
  getUserById,
  deleteUser,
};