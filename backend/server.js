require("./app/config/db.config");

const cors = require("cors");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const recipesRoutes = require("./app/routes/recipes.route");
const ingredientsRoutes = require("./app/routes/ingredients.route");

app.get("/", (req, res) => {
  res.send(`server running on port ${port}: SmartChef Web App`);
});

app.use(express.json());
app.use(cors());

app.use("/api/recipes", recipesRoutes);
app.use("/api/ingredients", ingredientsRoutes);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
