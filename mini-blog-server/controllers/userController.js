const User = require('../models/userModel')
const { hashing, comparing } = require('../utils/hashing')
const jwt = require('jsonwebtoken')

const userRegister = async (req, res) => {
  const {username, email, password} = req.body
  const userCheck = await User.findOne({email: email})
  if(!userCheck) {
    let hashedPassword = await hashing(password)
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    })
    await newUser.save()
    res.status(201).json({message: 'Successfully Registered'})
  } else {
    res.status(409).json({message: 'User already exists'})
  }
}

const userLogin = async (req, res) => {
  try {
    const {email, password} = req.body
    const checkUser = await User.findOne({email: email})
    if(checkUser) {
      const checkPassword = await comparing(password, checkUser.password)
      if(!checkPassword) {
        res.status(401).json({message: 'Password is incorrect'})
      }
      let payload = {
        username: checkUser.username,
        email: checkUser.email,
      }
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '3h'})
      res.setHeader('Authorization', `Bearer ${token}`).status(200).json({message: 'Successfull logged in'})
    } else {
      res.status(401).json({message: 'User does not exist with this email'})
    }
  } catch (error) {
    console.log('Error in userLogin', error)
  }
}

module.exports = {
  userRegister,
  userLogin
}