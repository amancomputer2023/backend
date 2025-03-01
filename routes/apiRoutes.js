const express = require("express");
const { validateApiKey } = require("../middleware/authMiddleware");
const { register, login, admin } = require("../scripting/user");
const { insertService, findServices } = require("../scripting/services");
const { findAllProduct, insertProduct, findFeaturedProduct } = require("../scripting/product");
const multer = require("multer");
const { Readable } = require("stream");
const { getBucket } = require("../config/db");

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

router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const bucket = getBucket(); // Get the initialized bucket
    req.file.originalname = "image-" + Date.now() + ".jpg";
    console.log("Uploading file:", req.file.originalname);

    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(req.file.originalname);

    readableStream.pipe(uploadStream);

    uploadStream.on("finish", () => {
      console.log(`File uploaded successfully: ${req.file.originalname}`);
      res.json({ fileID: uploadStream.id, filename: req.file.originalname });
    });

    uploadStream.on("error", (err) => {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed", detail: err.message });
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Unexpected error", detail: error.message });
  }
});

module.exports = router;
