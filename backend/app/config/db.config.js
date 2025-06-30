require("dotenv").config();
const mongoose = require("mongoose");

// for local MongoDB container (obsolete)
// const dbUri = 'mongodb://portfolio_database/portfoliodb';

const dbUri =
  process.env.MONGO_URI ||
  /* mongodb://localhost:27017/smartchefdb */ "mongodb://smartchef_database/smartchefdb";

mongoose
  .connect(dbUri)
  .then(() => {
    const source = process.env.MONGO_URI;
    console.log(`connection to ${source}: successful`);
  })
  .catch((err) => console.error("MongoDB error: ", err));

module.exports = mongoose;
