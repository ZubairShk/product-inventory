const Product = require("../models/product.model");
const { validateRequest } = require("../services/common.services");

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    if (product) {
      res.status(200).json({
        success: true,
        message: `product fetched`,
        data: product,
      });
    } else {
      res.status(401).json({
        success: false,
        message: `couldn't fetch product details`,
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.addProduct = (req, res) => {
  const { name, vat, grossPrice, netPrice, qty, photo } = req.body;
  if (!validateRequest(req.body, "add")) {
    res.status(400).json({
      success: false,
      message: `invalid request body`,
    });
  }
  let pic = {
    url: photo?.url,
    file: photo?.file,
  };
  const query = { name, vat, grossPrice, netPrice, qty, photo: pic };
  const product = new Product(query);
  product
    .save()
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `product added`,
      });
    })
    .catch((error) => {
      return res.status(500).send({ error });
    });
};

exports.editProduct = async (req, res) => {
  const { id, name, vat, grossPrice, netPrice, qty, photo } = req.body;
  if (!validateRequest(req.body, "update")) {
    res.status(400).json({
      success: false,
      message: `invalid request body`,
    });
  }
  let pic = {
    url: photo?.url,
    file: photo?.file,
  };
  const query = { name, vat, grossPrice, netPrice, qty, photo: pic };
  try {
    const product = await Product.findByIdAndUpdate(id, query);
    if (product) {
      res.status(200).json({
        success: true,
        message: `product updated`,
      });
    } else {
      res.status(401).json({
        success: false,
        message: `product not update`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.query;
  console.log("id", id);
  if (!validateRequest(req.query, "delete")) {
    res.status(400).json({
      success: false,
      message: `invalid request query`,
    });
  }
  try {
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.status(200).json({
        success: false,
        message: `product Deleted`,
      });
    } else {
      res.status(401).json({
        success: false,
        message: `product not deleted`,
      });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
