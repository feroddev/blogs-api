const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');

const insertPost = async ({ title, content, categoryIds, userId }) => {
  const post = await BlogPost.create({ title, content, userId });
  const postId = post.id;
  const promisses = categoryIds.map((categoryId) => PostCategory.create({ postId, categoryId }));
  await Promise.all(promisses);
  return { status: 'CREATED', data: post };
};

const include = { include:
  [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ], 
}; 

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({ ...include });
  return { status: 'SUCCESSFUL', data: posts };
};

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, { ...include });
  if (!post) {
    return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  }
  return { status: 'SUCCESSFUL', data: post };
};

const getPostByQuery = async (q) => {
  const posts = await BlogPost.findAll({ ...include,
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } }],
    },
  });
  return { status: 'SUCCESSFUL', data: posts };
};

const updatePost = async ({ id, title, content }) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const { data } = await getPostById(id);
  return { status: 'SUCCESSFUL', data };
};

const deletePost = async (id) => {
  await BlogPost.destroy({ where: { id } });
  return { status: 'DELETED' };
};

module.exports = {
  insertPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostByQuery,
};