const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
router.get("/", (req, res) => {
  res.status(200).json({
    message: "aman",
  });
});

router.post("/register", UserController.register);
router.get("/users", UserController.findAll);
router.get("/users/:id", UserController.findById);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
