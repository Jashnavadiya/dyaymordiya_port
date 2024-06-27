
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Image = require('./models/Image.js'); // Ensure this path is correct
require('dotenv').config();
app.use(express.json());

const cors = require('cors');

// Use CORS middleware
app.use(cors());

mongoose.connect(process.env.MONGO_URL + "/imagesDB")
    .then(() => console.log("Mongo Connected"))
    .catch(err => console.error("Mongo connection error:", err));

app.post("/upload-by-link", async (req, res) => {
    try {
        const { title, desc, url, cate } = req.body;

        const imageDoc = new Image({ title, desc, url, cate });
        await imageDoc.save();
        res.status(201).json(imageDoc);
    } catch (error) {
        console.error("Error saving image:", error);
        res.status(500).json({ error: 'Server error' });
    }
});
app.post("/delete-img-link", async (req, res) => {
  try {
    const {url} = req.body;
    console.log(url);
    const deleteResult = await Image.deleteOne({ url: url });

    if (deleteResult.deletedCount === 1) {
      console.log('Image with URL ${url} deleted successfully');
      res.status(200).json({ message: 'Image deleted' });
    } else {
      console.log('Image not found');
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Server error' });
  } 
});

app.post("/validate", async (req, res) => {
  try {
    const {username,pass} = req.body;
    // console.log(url);
    // const deleteResult = await Image.deleteOne({ url: url });

    if (username == process.env.PROF_USR && pass == process.env.PROF_PASS) {
      // console.log('Image with URL ${url} deleted successfully');
      res.status(200).json({ message: 'Success' });
    } else {
      // console.log('Image not found');
      res.status(404).json({ message: 'Failed' });
    }
  } catch (error) {
    console.error('Error validating:', error);
    res.status(500).json({ message: 'Server error' });
  } 
});

app.get('/get-images', async (req, res) => {
    try {
      const images = await Image.find(); // Fetch all images from the database
    //   const imageUrls = images.map(image => image.url); // Extract image URLs
  
      res.json(images); // Send the list of image URLs as JSON response
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving images'); // Handle errors gracefully
    }
  });

  // app.get('/login', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'public', './login.html')); // Replace 'index.html' with your actual file name
  // });


const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
