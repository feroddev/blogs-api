const httpMap = {
  SUCCESSFUL: 200,
  CREATED: 201,
  DELETED: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

module.exports = (code) => httpMap[code];