const { User } = require('../models');
const generateToken = require('../utils/generateAndVerifyToken');

const insertToken = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || password !== user.password) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const token = generateToken(user.id);

  return { status: 'SUCCESSFUL', data: token };
};

module.exports = {
  insertToken,
};