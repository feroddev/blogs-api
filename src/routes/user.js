const express = require('express');
const { userController } = require('../controllers');
const validateInputsUser = require('../middlewares/validateInputsUser');
const authMiddleware = require('../middlewares/auth.middleware');

const userRoute = express.Router();

userRoute.post('/', validateInputsUser, userController.postUser);

userRoute.use(authMiddleware);
userRoute.get('/', userController.getAllUsers);
userRoute.get('/:id', userController.getUserById);
userRoute.delete('/me', userController.deleteUser);

module.exports = userRoute;