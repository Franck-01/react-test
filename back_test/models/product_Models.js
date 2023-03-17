const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productCollection = "productTest"
const productSchema = new Schema({
    name: { type:String },
    model: { type:String },
    faction: { type: String },
    description: { type: String },
    url: { type: String },
    price: { type: Number },
    stock: { type: Number },
})
const Product = mongoose.model(productCollection, productSchema)

module.exports = Product