const categoryController = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();

router.get("/", categoryController.getCategory);
router.post("/", categoryController.createCategory);
router.delete("/:id", categoryController.removeCategory);

module.exports = router;
