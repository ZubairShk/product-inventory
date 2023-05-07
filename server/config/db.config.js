const mongoose = require("mongoose");
require("dotenv").config();

connectDbAsync = async () => {
  await mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connection initiated"))
    .catch((e) => console.log("error: " + e));
};
connectDbAsync();
const db = mongoose.connection;
module.exports = db;
