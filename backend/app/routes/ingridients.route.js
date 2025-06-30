const ingridientsController = require("../controllers/ingridients.controller");
const express = require("express");
const router = express.Router();

router.post("/findAll", ingridientsController.findAll);

module.exports = router;
