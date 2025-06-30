const Ingridients = require("../models/ingridient.model");
const mongoose = require("mongoose");

const ingridientsController = {};

ingridientsController.findAll = async function (req, res) {
  const rawFilter = req.body || {};
  //const filter = { ...rawFilter, isDeleted: false };
  const filter = {};
  try {
    const ingridients = await Ingridients.find(filter);
    res.status(200).json(ingridients);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to load ingridients", error: err.message });
  }
};

module.exports = ingridientsController;
