const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    date: Date,
    recipes: [String],
    period: String, // "breakfast", "lunch", "dinner", "snack"
  },
  {
    timestamps: true, // ajoute createdAt & updatedAt automatiquement
  }
);
scheduleSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
