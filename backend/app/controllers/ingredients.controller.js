const Ingredient = require("../models/ingredient.model");
const mongoose = require("mongoose");

const ingredientsController = {};

ingredientsController.find = async function (req, res) {
  const rawFilter = req.body || {};
  //const filter = { ...rawFilter, isDeleted: false };
  const filter = {};
  try {
    const ingredients = await Ingredient.find(filter);
    res.status(200).json(ingredients);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to load ingredients", error: err.message });
  }
};

ingredientsController.create = async function (req, res) {
  try {
    const newIngredient = new Ingredient(req.body);
    const result = await newIngredient.save();
    res.status(201).json(result);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Ingredient creation failed", error: err.message });
  }
};

ingredientsController.update = async function (req, res) {
  const ingredientId = req.params.id;
  const updateData = req.body;
  if (!mongoose.Types.ObjectId.isValid(ingredientId)) {
    return res.status(400).json({ message: "Invalid ingredient ID" });
  }
  try {
    const updatedIngredient = await Ingredient.findByIdAndUpdate(
      ingredientId,
      updateData,
      { new: true }
    );
    if (!updatedIngredient) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    res.status(200).json(updatedIngredient);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Ingredient update failed", error: err.message });
  }
};

module.exports = ingredientsController;
