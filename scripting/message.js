const { addMessage, getAllMessages } = require('../models/messageModel');
async function insertMessage(req, res) {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        await addMessage({ name, email, message, createdAt: new Date() });
        res.status(201).json({ message: "Service added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

async function findAllMessages(req, res) {
    try {
        const message = await getAllMessages();
        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { insertMessage, findAllMessages } ;
