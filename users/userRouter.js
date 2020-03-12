const express = require('express');

const Users = require('./userDb');
const Posts = require("../posts/postRouter");

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user)
  })
  .catch(err => res.status(500).json({ error: "Error adding this user" }))
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  const newPost = { ...req.body, user_id: req.params.id}
  Posts.insert(newPost)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => res.status(500).json({ error: "Error adding this post" }))
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get(req.query)
  .then(user => res.status(200).json(user))
  .catch(err => res.status(500).json({ error: "Error fetching users!" }))
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Users.getUserPosts(req.params.id)
  .then(posts => {
    if(posts){
      res.status(200).json(posts)
    } else {
      res.status(400).json({ error: "Invalid user ID" })
    }
  })
  .catch(err => res.status(500).json({ error: "Error fetching user posts" }))
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!s
}

function validateUser(req, res, next) {
  // do your magic!
  const user = req.body;
  if (!user) {
    res.status(400).json({ message: "Missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "Missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  const post = req.body;
  if (!post){
    res.status(400).json({ message: "Missing post data" });
  } else if (!post.text) {
    res.status(400).json({ message: "Missing required text" })
  } else {
    next();
  }
}

module.exports = router;
