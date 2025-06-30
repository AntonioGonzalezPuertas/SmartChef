const recipesController = require("../controllers/recipes.controller");
const express = require("express");
const router = express.Router();

router.post("/findAll", recipesController.findAll);

module.exports = router;
