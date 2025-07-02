const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: String,
    categories: [String],
    ingredients: [
      {
        id: { type: String },
        quantity: { type: Number },
      },
    ],
    description: String,
    instructions: [String], // Instructions for the recipe
    favorite: Boolean,
    photos: [String],
    cost: Number,
    cost_unit: String, // Unité de coût, par exemple "€", "$", etc.
    cookingTime: Number,
  },
  {
    timestamps: true, // ajoute createdAt & updatedAt automatiquement
  }
);
recipeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
