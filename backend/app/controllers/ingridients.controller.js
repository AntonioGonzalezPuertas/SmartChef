const Ingredients = require("../models/ingredient.model");
const mongoose = require("mongoose");

const ingredientsController = {};

ingredientsController.findAll = async function (req, res) {
  const rawFilter = req.body || {};
  //const filter = { ...rawFilter, isDeleted: false };
  const filter = {};
  try {
    const ingredients = await Ingredients.find(filter);
    res.status(200).json(ingredients);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to load ingredients", error: err.message });
  }
};

module.exports = ingredientsController;
