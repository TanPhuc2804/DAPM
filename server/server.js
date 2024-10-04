const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000
const allowedOrigins = ["http://localhost:5001"];
dotenv.config()
//route 
const authRouter = require('./scr/route/Auth.route')
const customerRouter =require('./scr/route/Customer.route')
const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    })
);

app.use(express.static("public"));

app.use("/auth",authRouter)
app.use("/customer",customerRouter)


mongoose.connect(
   process.env.StringUrlMongo)
    .then(() => {
        console.log("Connect date successfully")
    })
    .catch((err) => console.log(err))


app.listen(PORT, () => {
    console.log("Server listening to Port", PORT)
})