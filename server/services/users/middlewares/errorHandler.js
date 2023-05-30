module.exports = (err, req, res, next) => {
  let message = "Internal Server Error";
  let status = 500;

  switch (err.name) {
    case "Password is required":
      status = 400;
      message = "Pssword is required";
      break;
    case "Email is required":
      status = 400;
      message = "Email is required";
      break;
    case "SequelizeValidationError":
      status = 400;
      message = err.errors;
      break;
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.message;
      break;
    case "Email or Password is wrong":
      status = 401;
      message = "Email or Password is wrong";
      break;
    case "Unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Unauthenticated";
      break;
    case "Forbidden":
      status = 403;
      message = "You are not authorized";
      break;
    case "NotFound":
      status = 404;
      message = "Data not found";
      break;
    default:
      break;
  }

  res.status(status).json({ message: message });
};
