const Recipes = require("../models/recipe.model");
const mongoose = require("mongoose");

const recipesController = {};

recipesController.find = async function (req, res) {
  //const rawFilter = req.body || {};
  //const filter = { ...rawFilter, isDeleted: false };
  const filter = req.body || {};
  try {
    const recipes = await Recipes.find(filter);
    res.status(200).json(recipes);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Failed to load recipes", error: err.message });
  }
};

recipesController.create = async function (req, res) {
  try {
    const newRecipe = new Recipes(req.body);
    const result = await newRecipe.save();
    res.status(201).json(result);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Recipe creation failed", error: err.message });
  }
};

recipesController.update = async function (req, res) {
  const recipeId = req.params.id;
  const updateData = req.body;

  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ message: "Invalid recipe ID" });
  }
  try {
    const updatedRecipe = await Recipes.findByIdAndUpdate(
      recipeId,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Recipe update failed", error: err.message });
  }
};

recipesController.delete = async function (req, res) {
  const recipeId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(recipeId)) {
    return res.status(400).json({ message: "Invalid recipe ID" });
  }
  try {
    const deletedRecipe = await Recipes.findByIdAndDelete(recipeId);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Recipe deletion failed", error: err.message });
  }
};

module.exports = recipesController;
