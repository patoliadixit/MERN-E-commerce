const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./config')
const ProductModel = require('./models/product')
const connectionString = config.MONGODB_STRING

const app = express()

app.use(cors({ origin: true, credentials: true }));
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Mongoose connected")
  })

app.get("/", (req, res) => {
  console.log("GET Method")
  ProductModel.find()
    .then(product => res.json(product))
})
app.post("/", (req, res) => {
  console.log("POST Method")
  ProductModel.create(req.query)
    .then(() => res.json({ msg: "Product saved successfully" }))
    .catch((err) => err)
})

const PORT = 8080
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})
