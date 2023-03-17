const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require("express-validator")

const User = require("../models/user_Models")

const router = express.Router();

router.post("/very_account", async (req, res, next) => {
    const {token} = req.body;

    jwt.verify(token, process.env.jwt_key, async (err, valid_token) => {
        if (err) {
            res.json({status: false})
            return
        }
        const id = valid_token.id
        const find_Account = await User.findById(id)

        if (!find_Account) {
            res.json({status: false})
            return
        }
        res.json({
            status: true,
            username: find_Account.username,
            email: find_Account.email
        })
    })
})
router.post("/login",[
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    ], async (req, res, next) => {
        const {username, password} = req.body
        const error = validationResult(req)

        if (!error.isEmpty()){
            res.json({ error: error.array(), error_type: 0 });
            return;
        }
        const findOne = await User.findOne({username:username})
        if (!findOne) {
            res.json({ message: "Invalid account", error_type: 1 });
            return;
        }

        await bcrypt.compare(password, findOne.password, (err, isValid) => {
            if (isValid) {
                const id = findOne._id;
                const token = jwt.sign({ id }, process.env.jwt_key, {
                expiresIn: "7d",
            });
            res
                .cookie("jwt_token", token)
                .status(200)
                .send({ message: "Loggin ", token, created: true });
            } else {
                res.json({ message: "Invalid Account", created: false });
            }
        })
    }
)
router.post("/register",[
    check("username", "Enter Username").not().isEmpty(),
    check("email", "Enter Email").not().isEmpty(),
    check("password", "Enter Password").not().isEmpty(),
    check("confirm_pass", "Confirm Password").not().isEmpty(),
    ], async (req, res, next) => {
        const {username, email, password, confirm_pass} = req.body
        const error = validationResult(req)
        if (!error.isEmpty()){
            res.json({ error: error.array(), error_type: 0, created: false });
            return;
        }
        const findOne_username = await User.findOne({username:username})
        const findOne_email = await User.findOne({email:email})
        if (findOne_username) {
            res.json({message: "Username already exist", error_type: 1, created: false});
            return;
        }
        if (findOne_email) {
            res.json({message: "Email already exist", error_type: 1, created: false});
            return;
        }
        if (password !== confirm_pass) {
            res.json({message: "Password does not match", error_type: 1, created: false});
            return
        }

        const user = new User({
            username,
            email,
            password
        })
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(user.password, salt)
        user.save().then((doc)=>{
            const id = doc._id
            const token = jwt.sign({ id }, process.env.jwt_key, {
                expiresIn: "7d",
            });
            res.cookie("jwt_token", token)
                .status(201)
                .send({id, created: true, token, message: "Registered"})
        })
    }
)

module.exports = router;