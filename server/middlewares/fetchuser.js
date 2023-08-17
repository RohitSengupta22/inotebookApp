const jwt = require('jsonwebtoken');
const secret = "Rohitisqunatumx"

const fetchuser = (req, res, next) => {

    const token = req.header("auth-token");
    if (!token) {
        res.stats(401).send("authenticate using valid token")
    }

    try {
        const data = jwt.verify(token, secret)
        req.data = data.user;
        next();
    } catch (error) {
        console.log(error)
    }

}

module.exports = fetchuser;