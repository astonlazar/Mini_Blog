const mongoose = require('mongoose')

function connect() {
  mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(`MongoDB connected`))
  .catch(err => console.log(`MongoDb connection error - ${err}`))
}

module.exports = connect