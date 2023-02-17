const express = require('express');
const {check, validationResult} = require("express-validator")

const Product = require("../models/product_Models.js")

const router = express.Router();

router.get("/get_all", async (req, res) => {
    const product = await Product.findById({})
    res.json(product)
})
router.get("/get_all/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    if (!product) {
        res.json({message: "product not found", status: 0})
        return
    }
    res.json(product)
})
router.post("/add", 
    check("name", "Enter Product Name").not().isEmpty(),
    check("model", "Enter Product Model").not().isEmpty(),
    check("faction", "Enter Product Faction").not().isEmpty(),
    check("description", "Enter Product Description").not().isEmpty(),
    check("url", "Add Image Link/Url").not().isEmpty(),
    check("price", "Enter Product Price").not().isEmpty(),
    check("stock", "Enter Product Stock").not().isEmpty(),
    (req, res) => {
    const {name, model, faction, description, url, price, stock} = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.json({ errors: errors.array(), status: 0 })
        return
    }

    const newProduct = new Product({
        name,
        model,
        faction,
        description,
        url,
        price,
        stock
    })
    newProduct.save().then((docs) => {
        res.json({message: "Product Added Successfully", status: 1, docs})
    })
})

module.exports = router