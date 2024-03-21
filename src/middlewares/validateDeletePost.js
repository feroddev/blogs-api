const { BlogPost } = require('../models');

const validateDeletePost = async (req, res, next) => {
  const { id } = req.params;
  const userId = res.locals.user.id;
  const post = await BlogPost.findByPk(id);

  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (post.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = [validateDeletePost];