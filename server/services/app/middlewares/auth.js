const { decodeToken } = require("../helpers/jwt");
const { User, Post } = require("../models");

async function authentication(req, res, next) {
  let access_token = req.headers.access_token;
  try {
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }

    let payload = decodeToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
}
async function authorization(req, res, next) {
  try {
    let userId = req.user.id;
    let role = req.user.role;
    let post = await Post.findByPk(req.params.id);

    if (!post) throw { name: "NotFound" };
    // console.log(userId, "ini id userr yang request");
    // console.log(post.authorId, "ini id pemilik post");
    // console.log(role, "ini role");
    if (userId !== post.authorId && role !== "admin") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authentication, authorization };
