const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    name: String,
    categories: [String],
    shops: [String],
    units: String,
    stock: Number,
    min_stock: Number,
    price: Number,
    price_unit: String,
  },
  {
    timestamps: true, // ajoute createdAt & updatedAt automatiquement
  }
);

ingredientSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
