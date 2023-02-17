const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userCollection = "users-test"
const userSchema = new Schema({
    name: { type:String },
    email: { type:String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    lastLogin: {type: Date, default: Date.now()}
})

const User = mongoose.model(userCollection, userSchema)

module.exports = User