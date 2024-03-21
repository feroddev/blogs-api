const { User } = require('../models');
const generateToken = require('../utils/generateAndVerifyToken');

const createUser = async ({ displayName, email, password, image }) => {
  const user = await User.create({ displayName, email, password, image });

  const token = generateToken(user.id);
  return { status: 'CREATED', data: token };
};

const getAllUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: 'SUCCESSFUL', data: users };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) {
    return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  }
  return { status: 'SUCCESSFUL', data: user };
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
  return { status: 'DELETED' };
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};