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
                res.status(500).send("User not found");
            } else {
                const compare = await bcrypt.compare(req.body.password, user.password);
                
                if (!compare) {
                    res.status(500).send("Incorrect password");
                } else {
                    
                    
                    const data = {
                        user: {
                            id: user.id
                        }
                    }
                
                    const authToken = jwt.sign(data,secret);
                    res.json({ authToken }); 
                    
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
