


// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const Image = require('./models/Image.js');
// require('dotenv').config()
// app.use(express.json());

// mongoose.connect(process.env.MONGO_URL).then(console.log("Mongo Connected"));

// // Define routes
// app.post("/upload-by-link", async (req, res) => {
//     try {
//         const { title, desc, url, cate } = req.body;
        
//         // Create a new document using Mongoose model
//         const imageDoc = await Image.create({
//             title, desc, url, cate
//         });

//         // Optionally, you can send back the created document as JSON response
//         res.status(201).json(imageDoc);
//     } catch (error) {
//         console.error("Error saving image:", error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// const PORT = 5500;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });