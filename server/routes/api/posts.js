const express = require('express');
const router = express.Router();
const passport = require('passport');

const config = require('../../config/key')
const SECRET = config.SECRET

const Post = require('../../models/User')
const validatePost = require('../../validation/post')


passport.authenticate('jwt', { session: false })

//Fetching all posts
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Post.find({ author: req.user.name })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ user: `error fetching posts of user ${req.user.name}` }))
})

router.get('/post/:id', (req, res) => {
  Post.find({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ id: `error fetching post by id ${req.params.id}` }))
})

router.get('/author/:author', (req, res) => {
  Post.find({ author: req.params.author })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ author: `error fetching posts from author ${req.params.author}` }))
})

router.post('/create', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const author = req.user.name;
    const post = req.body;
    const { errors, isValid } = validatePost(post)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    post.author = author;
    const newPost = new Post(post)
    newPost.save()
      .then(post => res.json(post))
      .catch(error => console.log({ create: 'error creating a new post' }, error))
  });

router.patch('/update/:id', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const author = req.user.name;
    const { errors, isValid } = validatePost(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const { title, body } = req.body;
    Post.findOneAndUpdate(
      { author, _id: req.params.id },
      { $set: { title, body } },
      { new: true }
    )
      .then(post => res.status(200).json(post))
      .catch(error => res.status(400).json({ update: 'error updating existing post' }))
  })


router.delete('/delete/:id', passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const author = req.user.name;
    Post.findOneAndDelete({ author, _id: req.params.id })
      .then(post => res.status(200).json(post))
      .catch(error => res.status(400).json({ delete: 'error deleting a post' }))
  })

module.exports = router