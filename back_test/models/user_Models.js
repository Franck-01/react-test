const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userCollection = "usersTest"
const userSchema = new Schema({
    email: { type:String },
    username: { type: String },
    password: { type: String },
    lastLogin: {type: Date, default: Date.now()}
})

const User = mongoose.model(userCollection, userSchema)

module.exports = User