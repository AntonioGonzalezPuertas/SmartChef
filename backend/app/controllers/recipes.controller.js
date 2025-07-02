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

module.exports = recipesController;
