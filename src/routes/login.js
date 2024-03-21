const express = require('express');
const validateLogin = require('../middlewares/validateLogin');
const { loginController } = require('../controllers');

const loginRoute = express.Router();

loginRoute.post('/', validateLogin, loginController.postLogin);

module.exports = loginRoute;