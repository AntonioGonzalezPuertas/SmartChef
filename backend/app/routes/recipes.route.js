const recipesController = require("../controllers/recipes.controller");
const express = require("express");
const router = express.Router();

router.post("/find", recipesController.find);

module.exports = router;
