const recipesController = require("../controllers/recipes.controller");
const express = require("express");
const router = express.Router();

router.post("/find", recipesController.find);
router.post("/", recipesController.create);
router.put("/:id", recipesController.update);
router.delete("/:id", recipesController.delete);

module.exports = router;
