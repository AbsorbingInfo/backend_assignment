const User = require('../models/userModel')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken')

const createUser = async (req,res) => {
  try {
    const { name, email, password} = req.body
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({name, email, password: hashedPassword})
    res.status(200).json({ message: "user successfully created" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body

  let emptyFields = []

  if (!email) {
    emptyFields.push('email')
  }
  if (!password) {
    emptyFields.push('password')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields:', emptyFields })
  }

  const user = await User.findOne({email})
  if (!user) {
    return res.status(401).json({ error: 'Invalid email' });
  }

  try {
    console.log(password, user)
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({}, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

    return res.status(200).json({ message: 'Authentication successful', token});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createUser,
  userLogin
}