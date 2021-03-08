const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  img: {
    type: String,
    require: true
  }
})
module.exports = mongoose.model("ProductModel", productSchema)