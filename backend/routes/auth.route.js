const express = require("express");
const router = express.Router();
const { signUp, logIn, logOut } = require("../controllers/auth.controller");
const { protectRoute } = require("../middlewares/protectRoute.middleware");

router.post("/signup", signUp);
router.post("/login", logIn);
router.post("/logout", protectRoute, logOut);

module.exports = router;
