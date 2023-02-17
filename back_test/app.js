const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const user_Router = require("./router/user_Router.js")
const product_Router = require("./router/product_Router.js")
const {connectDB} = require("./dataBase/connect_mongo.js")

dotenv.config()
connectDB()

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use("/", user_Router)
app.use("/products", product_Router)

const port = process.env.PORT || 7000
const server = app.listen(port, () => {
    console.log(`Server run on Port ${port}`)
})