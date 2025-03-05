const express = require("express");
const { validateApiKey } = require("../middleware/authMiddleware");
const { register, login, admin, updateUserDetail } = require("../scripting/user");
const { insertService, findServices } = require("../scripting/services");
const { findAllProduct, insertProduct, findFeaturedProduct } = require("../scripting/product");
const multer = require("multer");
const path = require("path");
const { imageUpload } = require("../scripting/imageUpload");
const { newsLetters } = require("../scripting/newsLetters");
const { insertMessage, findAllMessages } = require("../scripting/message");

const router = express.Router();
router.use(validateApiKey);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/admin").get(admin);
router.route("/services").get(findServices).post(insertService);
router.route("/product").get(findAllProduct).post(insertProduct);
router.route("/featured").get(findFeaturedProduct);
router.route("/newsletter").post(newsLetters);
router.route("/message").post(insertMessage).get(findAllMessages);
router.route("/updateUser").post(updateUserDetail)

router.post("/upload", upload.single("image"), imageUpload);

module.exports = router;
