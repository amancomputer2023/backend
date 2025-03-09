const express = require("express");
const { validateApiKey } = require("../middleware/authMiddleware");
const { register, login, admin, updateUserDetail } = require("../scripting/user");
const { insertService, findServices } = require("../scripting/services");
const { findAllProduct, insertProduct, findFeaturedProduct } = require("../scripting/product");
const { imageUpload } = require("../scripting/imageUpload");
const { newsLetters } = require("../scripting/newsLetters");
const { insertMessage, findAllMessages } = require("../scripting/message");
const { insertfeedback, findAllFeedback } = require("../scripting/feedback");
const multer = require("multer");
const { addToCart, getCart, removeFromCart, updateCart } = require("../scripting/addToCart");

const router = express.Router();

// ✅ Apply API Key Validation Only to Specific Routes
const protectedRoutes = ["/services", "/product", "/featured", "/newsletter", "/message", "/upload", "/updateUser"];
protectedRoutes.forEach(route => router.use(route, validateApiKey));

// ✅ Set Up Multer Storage with File Validation
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ User Routes
router.post("/register", register);
router.post("/login", login);
router.get("/admin", admin);
router.put("/updateUser", updateUserDetail); // 🔄 Changed POST to PUT

// ✅ Services Routes
router.route("/services").get(findServices).post(insertService);

// ✅ Product Routes
router.route("/product").get(findAllProduct).post(insertProduct);
router.get("/featured", findFeaturedProduct);

// ✅ Messages & Newsletters
router.post("/newsletter", newsLetters);
router.route("/message").post(insertMessage).get(findAllMessages);
router.route("/feedback").post(insertfeedback).get(findAllFeedback);
router.route("/cart").post(addToCart).get(getCart).delete(removeFromCart).put(updateCart);

// ✅ Image Upload
router.post("/upload", upload.single("image"), imageUpload);

module.exports = router;
