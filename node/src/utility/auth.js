const jwt = require("jsonwebtoken");
const db = require("../models/index.js");

const auth = async (req, res, next) => {
  try {
    const publicRoutes = ['/users/create', '/users/login', '/users', '/movies/create' ,'/movies'];

    if (publicRoutes.includes(req.path)) {
      return next();
    }

    if (!req.headers.authorization) {
      console.log(!req.headers.authorization,"headers auth")
      return res.status(401).json({ message: "Unauthorized request." });
      
    }
    
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.decode(token);

    // Use Sequelize to find the user by email
    const userData = await db.User.findOne({ where: { email: decoded?.email } });

    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
     user: userData,
     isAdmin: userData.isAdmin || false,
    };

    if (req.params.id && req.params.id !== userData.id.toString()) {
      return res.status(403).json({ message: "You are not authorized to access this resource." });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized user" });
  }
};

module.exports = { auth };
