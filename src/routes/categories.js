const express = require('express');
const { categoriesController } = require('../controllers');
const authMiddleware = require('../middlewares/auth.middleware');
const validateInputCategories = require('../middlewares/validateInputCategories');

const categoriesRoute = express.Router();

categoriesRoute.use(authMiddleware);

categoriesRoute.post('/', validateInputCategories, categoriesController.createCategory);

categoriesRoute.get('/', categoriesController.getAllCategories);

module.exports = categoriesRoute;