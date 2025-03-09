const { getCartCollection } = require("../models/addToCartModal");
const { ObjectId } = require("mongodb"); // To handle MongoDB Object IDs

// ✅ Add to Cart
async function addToCart(req, res) {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const cartCollection = await getCartCollection();
        const userCart = await cartCollection.findOne({ userId });

        if (!userCart) {
            // Create a new cart if it doesn't exist
            await cartCollection.insertOne({
                userId,
                items: [{ productId, quantity }],
            });
        } else {
            // Check if the product exists in cart
            const itemIndex = userCart.items.findIndex((item) => item.productId === productId);

            if (itemIndex > -1) {
                // If exists, update the quantity
                await cartCollection.updateOne(
                    { userId, "items.productId": productId },
                    { $inc: { "items.$.quantity": quantity } }
                );
            } else {
                // If not, push new item
                await cartCollection.updateOne(
                    { userId },
                    { $push: { items: { productId, quantity } } }
                );
            }
        }

        res.status(200).json({ message: "Item added to cart" });
    } catch (error) {
        console.error("Add to Cart Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// ✅ Get Cart Items
async function getCart(req, res) {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const cartCollection = await getCartCollection();
        const cart = await cartCollection.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        res.json(cart);
    } catch (error) {
        console.error("Get Cart Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// ✅ Remove Item from Cart
async function removeFromCart(req, res) {
    try {
        const { userId, productId } = req.body;
        if (!userId || !productId) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const cartCollection = await getCartCollection();
        const result = await cartCollection.updateOne(
            { userId },
            { $pull: { items: { productId } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Cart or item not found" });
        }

        res.json({ message: "Item removed from cart" });
    } catch (error) {
        console.error("Remove from Cart Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// ✅ Update Cart Quantity
async function updateCart(req, res) {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }

        const cartCollection = await getCartCollection();
        const result = await cartCollection.updateOne(
            { userId, "items.productId": productId },
            { $set: { "items.$.quantity": quantity } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Cart or item not found" });
        }

        res.json({ message: "Cart updated" });
    } catch (error) {
        console.error("Update Cart Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { addToCart, getCart, updateCart, removeFromCart };
