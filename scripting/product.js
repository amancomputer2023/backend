const express = require("express");
const {
  addProduct,
  getAllProduct,
  getFeaturedProduct,
} = require("../models/productModel");

const router = express.Router();

// Add a new service
async function insertProduct(req, res) {
  try {
    const {
      name,
      highlights,
      featured,
      image,
      brand,
      description,
      price,
      discountPercentage,
      stockQuantity,
      categoryName,
    } = req.body;

    if (
      !name ||
      !highlights ||
      !featured ||
      !image ||
      !brand ||
      !description ||
      !price ||
      !discountPercentage ||
      !stockQuantity ||
      !categoryName
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await addProduct({
        name,
        highlights,
        featured,
        image,
        brand,
        description,
        price,
        discountPercentage,
        stockQuantity,
        categoryName,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    res.status(201).json({ message: "Service added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all services
async function findAllProduct(req, res) {
  try {
    const services = await getAllProduct();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function findFeaturedProduct(req, res) {
  try {
    const services = await getFeaturedProduct();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { insertProduct, findAllProduct, findFeaturedProduct };
