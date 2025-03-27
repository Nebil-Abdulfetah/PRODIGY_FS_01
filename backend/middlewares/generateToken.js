const jwt = require("jsonwebtoken");

async function generateToken(user_id, res) {
  try {
    const token = jwt.sign({ user_id: user_id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });
    return token;
  } catch (error) {
    console.error("error creating token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  generateToken,
};
