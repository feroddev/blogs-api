const httpMap = require('../utils/httpMap');
const { CategoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await CategoryService.insert(name);
  return res.status(httpMap(status)).json(data);
};

const getAllCategories = async (_req, res) => {
  const { status, data } = await CategoryService.getAll();
  return res.status(httpMap(status)).json(data);
};

module.exports = {
  createCategory,
  getAllCategories,
};