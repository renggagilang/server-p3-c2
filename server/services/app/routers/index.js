const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const categoryRouter = require("./categoryRouter");
const postRouter = require("./postRouter");
const postController = require("../controllers/postController");
const { User } = require("../models/index");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "aman",
  });
});

router.get("/users", async (req, res) => {
  try {
    let user = await User.findAll({});
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});
router.get("/getAllTable", postController.getAllTable);
router.post("/register", adminController.register);
router.post("/login", adminController.login);

router.use("/categories", categoryRouter);
router.use("/posts", postRouter);

module.exports = router;
