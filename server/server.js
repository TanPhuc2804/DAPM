const dotenv = require('dotenv');
dotenv.config();

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

const authRouter = require('./scr/route/Auth.route');
const router = require('./scr/route/Product.route');
const supplierRoute = require('./scr/route/Supplier.route')
const customerRouter = require('./scr/route/Customer.route')
const categoryRouter = require('./scr/route/category.route');
const adminRouter = require('./scr/route/admin.route');
const orderRouter = require("./scr/route/Order.route");
const checkoutRouter = require("./scr/route/Checkout.route");
const voucherRouter = require("./scr/route/voucher.route");
const staffRouter = require("./scr/route/Staff.route")
const RoleRouter = require("./scr/route/role.route");
const createAdmin = require('./scr/services/createAdmin');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
}).then(() => {
        console.log("Database connected successfully");
       
    })
    .catch((err) => console.log("Database connection error: ", err));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
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

// Serve static files
app.use(express.static("public"));
app.use(express.static("uploads"));

// Routes
app.use("/auth", authRouter);
app.use("/products", router);
app.use("/supplier", supplierRoute);
app.use("/customer", customerRouter);
app.use('/category', categoryRouter);
app.use('/admin', adminRouter);
app.use('/order', orderRouter);
app.use('/checkout', checkoutRouter);
app.use('/Voucher', voucherRouter);
app.use('/staff', staffRouter);
app.use('/role', RoleRouter);
app.use('/sendEmail', orderRouter);




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

