const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
})

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    text: req.body.text,
    createAt: new Date()
  });
  res.status(201).send();
})

// Delete Post

router.delete('/:id', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({
    _id: new mongodb.ObjectID(req.params.id)
  });
  res.status(200).send();
})


// Connect to MongoDb

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://admin:danielczyk@cluster0-i6jpu.mongodb.net/vueLoginSystem?retryWrites=true', {
    useNewUrlParser: true
  });

  return client.db('vueLoginSystem').collection('posts');
}


module.exports = router;