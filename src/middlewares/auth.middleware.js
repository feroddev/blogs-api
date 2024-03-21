const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const [, token] = authorization.split(' '); // Bearer token

  try {
    const claims = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = {
      id: claims.sub,
    };
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};

module.exports = authMiddleware;