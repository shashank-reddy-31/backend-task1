const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();  
app.use(cors());  
app.use(bodyParser.json());

// MongoDB connection  
mongoose.connect('mongodb+srv://shashankreddypatlolla31:WzK6oXbUOP1AopOs@cluster0.x1vai.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })  
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Post Model
const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// RESTful Routes
// Create Post
app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.status(201).send(post);
});

// Get Posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.send(posts);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(3000, () => console.log(`Server running on port ${3000}`));