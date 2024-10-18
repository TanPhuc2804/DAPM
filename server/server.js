const dotenv = require('dotenv');
const express = require('express');
const swaggerjsdoc = require('swagger-jsdoc')
const swaggerui= require('swagger-ui-express')
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
const orderRouter = require("./scr/route/Order.route")
const checkoutRouter = require("./scr/route/Checkout.route")
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

// Serve static files
app.use(express.static("public"));


const options = {
    definition:{
        openapi:'3.1.0',
        info:{
            title:"API của web bán hàng thời trang",
            version:"0.1.0",
            description: "Đây là trang web để quản lý các APIs đã có ở trang web bán hàng thời trang",
            contact:{
                name:"Phan Tấn Phúc",
                email:"phantanphuc282004@gmail.com"
            }
        },
        servers:[
            {
                url:"http://localhost:3000/",
            }
        ]
    },
    apis:["./scr/route/*.js"]
}
const spacs = swaggerjsdoc(options)
app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
)
// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Database connection
mongoose.connect(process.env.StringUrlMongo)
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => console.log("Database connection error: ", err));


// Route setup
app.use("/auth", authRouter);
app.use("/products", router);  // Example product routes
app.use("/supplier", supplierRoute)
app.use("/customer", customerRouter)
app.use('/category', categoryRouter);
app.use('/admin', adminRouter);
app.use('/order', orderRouter);
app.use('/checkout', checkoutRouter);
