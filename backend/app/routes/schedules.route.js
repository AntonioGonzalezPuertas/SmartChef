const schedulesController = require("../controllers/schedules.controller");
const express = require("express");
const router = express.Router();

router.post("/find", schedulesController.find);
router.post("/", schedulesController.create);
router.put("/:id", schedulesController.update);
router.delete("/:id", schedulesController.delete);

module.exports = router;
