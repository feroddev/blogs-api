const { BlogPost } = require('../models');

const validateInputUpdatePost = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateUserIdAuthorization = async (req, res, next) => {
  const { id } = req.params;
  const userId = res.locals.user.id;
  const post = await BlogPost.findByPk(id);
  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = [validateInputUpdatePost, validateUserIdAuthorization];