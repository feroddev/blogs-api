const httpMap = require('../utils/httpMap');
const { LoginService } = require('../services');

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const { status, data } = await LoginService.insertToken(email, password);

  return res.status(httpMap(status)).json(data);
};

module.exports = {
  postLogin,
};