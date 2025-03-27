const jwt = require("jsonwebtoken");

async function protectRoute(req, res, next) {
  try {
    const token = req.headers.cookie.split('=')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = {
  protectRoute,
};
