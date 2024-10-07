const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
const allowedOrigins = ["http://localhost:5001"];
dotenv.config();

// Import routes
const authRouter = require('./scr/route/Auth.route');
const productRouter = require('./scr/route/Product.route');
const adminRouter = require('./scr/route/Admin.route');

const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// Serve static files
app.use(express.static("public"));

// Route setup
app.use("/auth", authRouter);
app.use("/products", productRouter);  // Example product routes
app.use("/admin", adminRouter);  // Example admin routes

// Database connection
mongoose.connect(process.env.StringUrlMongo)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => console.log("Database connection error: ", err));

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});