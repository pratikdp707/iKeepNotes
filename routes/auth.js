const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = process.env.JWT_SECRET_KEY


//ROUTE 1
//create a user using POST request --- endpoint:api/auth/createUser. No login required
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    // If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({"success" :false, errors: errors.array() });
    }
    try {
        //check if the user with same email already exists 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({"success" :false, error: "Sorry!! User with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email
        });

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({"success" :true,authToken});
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: "Please enter a unique value for email"})});
    } catch (error) {
        console.log(error);
        res.json({"success" :false,error:"Some error occured"}); 
    }
})

//ROUTE 2
//authenticate a user using POST request --- endpoint:api/auth/createUser. No Login required
router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    // If there are errors, return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({"success":false, errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        
        if(!user){
            return res.json({"success":false, error: 'Please try to login with correct credentials'});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.json({"success":false, error: 'Please try to login with correct credentials'});
        }

        const payload = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        res.json({"success":true, authToken});


    } catch (error) {
        console.log(error);
        res.json({"success":false, "error": "Internal Server error occured"});
    }

})


//ROUTE 3
//Get logged in user details using POST request --- endpoint:api/auth/getUser. Login required 
router.get('/getUser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json({"success":true, user});
    } catch (error) {
        res.json({"success":false,error:"Internal server error occured"});
    }
});

module.exports = router