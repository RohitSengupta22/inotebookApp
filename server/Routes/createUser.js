const fetchuser = require('../middlewares/fetchuser.js')
const User = require('../models/User.js');
const createUser = async(req,res) =>{
    try{

        const userId = req.data.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
        console.log(req.data)

    } catch(error){
        console.log(error)
    }
}

module.exports = createUser;