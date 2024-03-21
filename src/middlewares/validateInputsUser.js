const { User } = require('../models');

const validateInputDisplayName = (req, res, next) => {
  const { displayName } = req.body;
  if (!displayName || displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};

const validateInputEmail = async (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  if (!regex.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }

  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }
  next();
};

const validateInputPasswordAnd = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be at least 6 characters long',
    });
  }
  next();
};

module.exports = [
  validateInputDisplayName,
  validateInputEmail,
  validateInputPasswordAnd,
];