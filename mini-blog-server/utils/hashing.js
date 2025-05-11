const bcrypt = require('bcryptjs')

//hash the password
const hashing = async (password) => {
  let hashedPassword = await bcrypt.hash(password, 10)
  return hashedPassword
}

//compare the password
const comparing = async (password, hashedPassword) => {
  let comparedPassword = await bcrypt.compare(password, hashedPassword)
  return comparedPassword
}

module.exports = {
  hashing,
  comparing
}