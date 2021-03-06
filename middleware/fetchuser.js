const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY

const fetchuser = (req, res, next) => {

    //Get the user from the JWT token and add id to request object
    const token = req.header('auth-token');
    if (!token) {
        res.json({success:"false", error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        next();
    } catch (error) {
        res.json({success:"false", error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;