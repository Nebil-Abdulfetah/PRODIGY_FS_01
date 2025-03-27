const db = require("../config/db.config");

async function signUp(f_name, l_name, email, role, password) {
  try {
    const sql =
      "INSERT INTO USERS (`first_name`, `last_name`, `email`, `role`, `password`) VALUES (?,?,?,?,?)";
    const result = db.query(sql, [f_name, l_name, email, role, password]);
    return result;
  } catch (error) {
    throw error;
  }
}

async function isUser(email) {
  try {
    const sql = "SELECT * FROM USERS WHERE EMAIL = ?";
    const result = await db.query(sql, [email]);
    return result ? result[0] : null;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  signUp,
  isUser,
};
