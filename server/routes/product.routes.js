const express = require("express");
const routes = express.Router();
const {
  addProduct,
  editProduct,
  deleteProduct,
  getAllProducts,
} = require("../controller/product.controller");

routes.get("/getAll", getAllProducts);
routes.post("/addNew", addProduct);
routes.delete("/delete", deleteProduct);
routes.put("/update", editProduct);

module.exports = routes;
