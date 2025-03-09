const { Cart } = require("../models/addToCartModal");
async function InsertToCart(req, res) {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] }); // Create a new cart if none exists
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity; // Update quantity if product exists
    } else {
      cart.items.push({ productId, quantity }); // Add new product if it doesn’t exist
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

async function FindToCart(req, res) {
  try {
    const { userId } = req.body;
    const cart = await Cart.findOne({ userId }).populate("items.productId"); // Fetch full product details

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

async function RemoveToCart(req, res) {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } }, // Remove the product from cart
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

async function UpdateToCart(req, res) {
  try {
    const { userId, productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity; // Update the quantity
      await cart.save();
      res.json({ message: "Cart updated", cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

module.exports = {InsertToCart, FindToCart, UpdateToCart, RemoveToCart};