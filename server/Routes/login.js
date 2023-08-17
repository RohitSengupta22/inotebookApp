const express = require('express');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = "Rohitisqunatumx"

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if(mailformat.test(req.body.email)){

            if (!user) {
                res.send("User not found");
            } else {
                const compare = await bcrypt.compare(req.body.password, user.password);
                
                if (!compare) {
                    res.send("Incorrect password");
                } else {
                    res.send("Login successful");
                    
                    const data = {
                        user: {
                            id: user.id
                        }
                    }
                
                    const authToken = jwt.sign(data,secret);
                    console.log(user.name)
                    console.log(authToken)
                }
            }
        }
        else{

            res.send("Invalid email format")
        }
        
      
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred");
    }
};

module.exports = login;
