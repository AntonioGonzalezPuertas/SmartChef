const ingredientsController = require("../controllers/ingredients.controller");
const express = require("express");
const router = express.Router();

router.post("/find", ingredientsController.find);
router.post("/create", ingredientsController.create);
router.put("/:id", ingredientsController.update);
router.delete("/:id", ingredientsController.delete);

module.exports = router;
