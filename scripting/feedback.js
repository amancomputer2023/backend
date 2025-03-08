const { addfeedback, getAllFeedback } = require('../models/feedbackModel');
async function insertfeedback(req, res) {
    try {
        const { name, contact, feedback, feedbackType } = req.body;
        
        if (!name || !contact || !feedback || !feedbackType ) {
            return res.status(400).json({ feedback: "All fields are required" });
        }

        await addfeedback({ name, contact, feedback, feedbackType, createdAt: new Date() });
        res.status(201).json({ feedback: "Service added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.feedback });
    }
};

async function findAllFeedback(req, res) {
    try {
        const feedback = await getAllFeedback();
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.feedback });
    }
};

module.exports = { insertfeedback, findAllFeedback } ;
    