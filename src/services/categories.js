const { Category } = require('../models');

const insert = async (name) => {
  const category = await Category.create({ name });
  return { status: 'CREATED', data: category };
};

const getAll = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

module.exports = {
  insert,
  getAll,
};