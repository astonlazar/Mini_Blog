const Post = require('../models/postModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const allPosts = async (req, res) => {
  const postData = await Post.find().populate('author').sort({createdAt: -1})
  res.status(200).json({posts: postData})
}

const allPostOfUser = async (req, res) => {
  const userData = await User.findOne({email: req.user.email})
  if(userData) {
    let postData = await Post.find().populate('author')
    let postDataOfUser = postData.filter(post => post.author.email === userData.email)
    if(postDataOfUser)
      res.status(200).json({posts: postDataOfUser})
  } else {
    res.status(404).json({message: 'No user logged in.'})
  }
}

const onePost = async (req, res) => {
  const postId = req.params.id
  const postData = await Post.findById(postId).populate('author')
  if(postData) 
    res.status(200).json({message: 'Success one post', post: postData})
}

const postCreate = async (req, res) => {
  try {
    const {title, content, tags} = req.body
    const authToken = req.headers.authorization
    const token = authToken.split(' ')[1]
    const payload = await jwt.decode(token, process.env.JWT_SECRET_KEY)
    // console.log(payload)
    const userData = await User.findOne({email: payload.email})
    let newPost = new Post({
      title,
      content,
      tags,
      author: userData._id
    })
    const saved = await newPost.save()
    if(saved)
      res.status(200).json({message: 'Successfully created a post'})
    else
      res.status(400).json({message: 'Not created'})
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

const postUpdate = async (req, res) => {
  const postId = req.params.id
  const {title, content, tags} = req.body
  const updatePost = await Post.findById(postId)
  if(updatePost) {
    updatePost.title = title
    updatePost.content = content
    updatePost.tags = tags
    await updatePost.save()
    res.status(200).json({message: 'Updated'})
  }
}

const postDelete = async (req, res) => {
  const postId = req.params.id
  const deletePost = await Post.findByIdAndDelete(postId)
  if(deletePost)
    res.status(200).json({message: 'Deleted successfully'})
}

module.exports = {
  allPosts,
  allPostOfUser,
  onePost,
  postCreate,
  postUpdate,
  postDelete,
}