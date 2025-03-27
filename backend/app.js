const express = require("express")
require("dotenv").config();
const db = require("./config/db.config")
const authRoutes = require("./routes/auth.route")
const app = express();
const port = process.env.PORT

// Middlewares
app.use(express.json())
//routes 
app.use("/api/auth", authRoutes)

//Starting server
app.listen(port, (err) => {
    if(err) throw err
    console.log(`Server running on port ${port}`)
})