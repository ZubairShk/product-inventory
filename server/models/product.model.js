const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  name: {
    type: String,
    require: true,
  },
  vat: {
    type: String,
    require: true,
  },
  qty: {
    type: Number,
    require: true,
  },
  grossPrice: {
    type: Number,
    require: true,
  },
  netPrice: {
    type: Number,
    require: true,
  },
  photo: {
    url: {
      type: String,
    },
    file: {
      type: String,
    },
  },
});
const Product = mongoose.model("product", product);
module.exports = Product;
