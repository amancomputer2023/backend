const express = require("express");
const { validateApiKey } = require("../middleware/authMiddleware");
const { register, login, admin } = require("../scripting/user");
const { insertService, findServices } = require("../scripting/services");
const { findAllProduct, insertProduct, findFeaturedProduct } = require("../scripting/product");
const multer = require("multer");
const path = require("path");
const { imageUpload } = require("../scripting/imageUpload");
const { newsLetters } = require("../scripting/newsLetters");

const router = express.Router();
router.use(validateApiKey);

const storage = multer.diskStorage({
  destination: "./images/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router
  .route("/register")
  .post(register); // Create a new package

router
  .route("/login")
  .post(login); // Create a new booking

router
  .route("/admin")
  .get(admin);

router.route("/services").get(findServices).post(insertService);
router.route("/product").get(findAllProduct).post(insertProduct);
router.route("/featured").get(findFeaturedProduct);
router.route("/newsletter").post(newsLetters);

router.route("/upload").post(upload.single("image"), imageUpload);


module.exports = router;
