const ingredientsController = require("../controllers/ingredients.controller");
const express = require("express");
const router = express.Router();

router.post("/find", ingredientsController.find);
router.post("/create", ingredientsController.create);

module.exports = router;
