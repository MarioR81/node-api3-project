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
  Users.getById(req.params.id)
  .then(user => {
    if(user){
      res.status(200).json(user)
    } else {
      res.status(400).json({error: "Invalid user id"})
    }      
  })
  .catch(err => res.status(500).json({error: "Error fetching user"}))
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
  Users.remove(req.params.id)
  .then(user => {
    if(user > 0){
      res.status(200).json({message: "User deleted"})
    } else {
      res.status(400).json({error: "User could not be deleted"})
    }
  })
  .catch(err => res.status(500).json({error: "Error deleting user"}))
});

router.put('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;
  const { name } = req.body;

  if(!name){
    res.status(400).json({error: "Name field is required"})
  }

  Users.update(id, req.body)
  .then(user => {
    if(user){
      res.status(200).json({message: "User updated successfully"});
    } else {
      res.status(404).json({error: "No user with that id exists"})
    }
  })
  .catch(err => {
    res.status(500).json({error: "Error updating user"})
    console.log(err)
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!s
  const {id} = req.params;

  Users.getById(id)
  .then(userId => {
    if(userId){
      userId = req.user;
      next();
    }else{
      res.status(400).json({error: "Invalid user id"})
    }
  })
  .catch (err =>{
    console.log(res.status(500).json({error: "There was an error validating the user id", err}))
  })
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
