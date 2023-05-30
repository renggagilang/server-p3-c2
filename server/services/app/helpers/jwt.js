var jwt = require("jsonwebtoken");

const SECRET_KEY = "secret";

module.exports = {
  createToken: (payload) => jwt.sign(payload, SECRET_KEY),
  decodeToken: (token) => jwt.verify(token, SECRET_KEY),
};
