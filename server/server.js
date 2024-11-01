const dotenv = require('dotenv');
const nodemailer = require('nodemailer')
const express = require('express');
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui = require('swagger-ui-express')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const allowedOrigins = ["http://localhost:5001"];
dotenv.config();
// Import routes
const authRouter = require('./scr/route/Auth.route');
const router = require('./scr/route/Product.route');
const supplierRoute = require('./scr/route/Supplier.route')
const customerRouter = require('./scr/route/Customer.route')
const categoryRouter = require('./scr/route/category.route');
const adminRouter = require('./scr/route/admin.route');
const orderRouter = require("./scr/route/Order.route");
const checkoutRouter = require("./scr/route/Checkout.route");
const voucherRouter = require("./scr/route/voucher.route");
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
    credentials: true,
}));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

mongoose.connect(process.env.StringUrlMongo)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => console.log("Database connection error: ", err));


// Serve static files
app.use(express.static("public"));

app.use("/auth", authRouter);
app.use("/products", router);  // Example product routes
app.use("/supplier", supplierRoute)
app.use("/customer", customerRouter)
app.use('/category', categoryRouter);
app.use('/admin', adminRouter);
app.use('/order', orderRouter);
app.use('/checkout', checkoutRouter);
app.use('/Voucher', voucherRouter);
app.use('/sendEmail',orderRouter)
