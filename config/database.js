const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URL = process.env.MONGODB_URL;

exports.dbConnect = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("database connect ho gya hai.");
    })
    .catch(() => {
      console.log("database connect nhi huaa hai.");
      process.exit(1);
    });
};
