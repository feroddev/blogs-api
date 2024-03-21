const express = require('express');
const validatePost = require('../middlewares/validateInputsPost');
const validatePostUpdate = require('../middlewares/validateInputUpdatePost');
const validateDeletePost = require('../middlewares/validateDeletePost');
const authMiddleware = require('../middlewares/auth.middleware');

const { postController } = require('../controllers');

const postRoute = express.Router();

postRoute.use(authMiddleware);
postRoute.get('/', postController.getAllBlogPosts);
postRoute.get('/search', postController.getBlogPostByQuery);
postRoute.get('/:id', postController.getBlogPostById);
postRoute.post('/', validatePost, postController.postBlogPost);
postRoute.put('/:id', validatePostUpdate, postController.updateBlogPost);
postRoute.delete('/:id', validateDeletePost, postController.deleteBlogPost);

module.exports = postRoute;