const { insertNewsLetterSubscriber, findNewsLetterSubscriber } = require("../models/NewsletterModel.js");
const newsLetters = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const existingSubscriber = await findNewsLetterSubscriber({ email });
      if (existingSubscriber) {
        return res.status(409).json({ message: "Email already subscribed" });
      }

      await insertNewsLetterSubscriber({email, createdAt: new Date(),});

      res.status(201).json({ message: "Subscription successful!" });
    } catch (error) {
      console.error("Error subscribing:", error);
      res.status(500).json({ message: "Server error, try again later" });
    };
};

module.exports = { newsLetters } ;
