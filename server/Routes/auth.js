const express = require('express');
const User = require('../models/User.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "Rohitisqunatumx"
const auth = async (req, res) => {
    const errObj = {
        name: "Enter a valid name",
        email: "Enter a valid email ID",
        password: "Enter a valid password"
    }

    
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hashSync(req.body.password, salt);
    const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    

    //creating instance of new user
    const user = new User({ name: req.body.name, email: req.body.email, password: secPass });

    const data = {
        user: {
            id: user.id
        }
    }

   

    if ((req.body.name === '' || req.body.name.length <= 3) && !mailformat.test(req.body.email)) {
        res.send(errObj.name + " and " + errObj.email)
    } else if (!mailformat.test(req.body.email)) {
        res.send(errObj.email)
    } else if (req.body.name === '' || req.body.name.length <= 3) {
        res.send(errObj.name)
    }


    else {
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            res.status(500).send("User already exists");
        } else {
            user.save();
            const authToken = jwt.sign(data,secret);
            res.json({ authToken }); 
            
        }
    }
}

module.exports = auth;

