require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, getBucket } = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Parse JSON request body

// Ensure the database connection is established before starting the server
connectDB().then(() => {
  console.log("Database connected.");

  app.use("/api", apiRoutes);

  // Route to serve images from GridFS
  app.get("/images/:filename", async (req, res) => {
    try {
      const bucket = getBucket();
      const files = await bucket.find({ filename: req.params.filename }).toArray();

      if (!files || files.length === 0) {
        return res.status(404).json({ error: "File not found." });
      }

      const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
      res.setHeader("Content-Type", "image/*");
      downloadStream.pipe(res);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Global error handler
  app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({ error: err.message });
  });

  // 404 handler for unknown routes
  app.use((req, res) => {
    res.status(404).json({ error: "Sorry, can't find that" });
  });

  // Start the server after DB connection
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

}).catch((err) => {
  console.error("Failed to connect to database:", err);
  process.exit(1);
});
