const authServices = require("../services/auth.service");
const bcrypt = require("bcrypt");
const {generateToken} = require("../middlewares/generateToken")

async function signUp(req, res) {
  try {
    const { f_name, l_name, email, role, password } = req.body;
    if (!f_name || !l_name || !email || !role || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    //check if email is found
    const user = await authServices.isUser(email);
    if (user) {
      return res.status(400).json({ message: "Email already exists!" });
    }
    //create new user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authServices.signUp(
      f_name,
      l_name,
      email,
      role,
      hashedPassword
    );
    if (!newUser) {
      return res.status(500).json({ message: "User creation failed" });
    }
    const token = await generateToken(newUser.insertId, res);
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function logIn(req, res) {
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({message: "All fields are required!"});
  }
  const user = await authServices.isUser(email);
  if(!user){
    return res.status(400).json({message: "Invalid email or password"});
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword){
    return res.status(400).json({message: "Invalid email or password"});
  }
  const token = await generateToken(user.id, res);
  console.log(user.user_id, user.role)
  return res.status(200).json(token);
}
async function logOut(req, res) {}
module.exports = {
  signUp,
  logIn,
  logOut,
};
