const { Category } = require('../models');

const validatePost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateCategoryId = async (req, res, next) => {
  const { categoryIds } = req.body;
  const promises = categoryIds.map((categoryId) => Category.findByPk(categoryId));
  const categories = await Promise.all(promises);
  // const validCategory = categories.map((category) => category);
  if (categories.includes(null)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = [
  validatePost,
  validateCategoryId,
];