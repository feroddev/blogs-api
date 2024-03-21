const { PostService } = require('../services');
const httpMap = require('../utils/httpMap');

const postBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = res.locals.user;
  const { status, data } = await PostService
    .insertPost({ title, content, categoryIds, userId: id });
  return res.status(httpMap(status)).json(data);
};

const getAllBlogPosts = async (_req, res) => {
  const { status, data } = await PostService.getAllPosts();
  return res.status(httpMap(status)).json(data);
};

const getBlogPostById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await PostService.getPostById(id);
  return res.status(httpMap(status)).json(data);
};

const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { status, data } = await PostService
    .updatePost({ id, title, content });

  return res.status(httpMap(status)).json(data);
};

const getBlogPostByQuery = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await PostService.getPostByQuery(q);
  return res.status(httpMap(status)).json(data);
};

const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  const { status } = await PostService.deletePost(id);
  return res.status(httpMap(status)).end();
};

module.exports = {
  postBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostByQuery,
};
