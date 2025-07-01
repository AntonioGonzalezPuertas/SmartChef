const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: String,
    categories: [String],
    ingredients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredient",
        quantity: String,
      },
    ],
    description: String,
    photos: [String],
    cost: Number,
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
