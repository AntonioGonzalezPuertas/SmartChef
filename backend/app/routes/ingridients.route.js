const ingredientsController = require("../controllers/ingredients.controller");
const express = require("express");
const router = express.Router();

router.post("/findAll", ingredientsController.findAll);

module.exports = router;
