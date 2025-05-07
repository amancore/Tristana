require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');


// Routes require
const authRoutes = require("./Routes/authRoutes");
const adminroutes=require("./Routes/adminRouters/admin")
const pageRouter=require("./Routes/pageRouter")
const cartRouter=require("./Routes/cartRouter")
const checkout=require("./Routes/checkout/userAddress")
const connectDB=require("./config/db")

const app = express();

const corsOption = {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "DELETE","PUT"],
    credentials: true 
};
app.use(cors(corsOption)); 


// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser()); 


// connect mongodb
connectDB()


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminroutes);
app.use("/api/pages",pageRouter);
app.use("/api/cart",cartRouter);
app.use("/api/checkout",checkout);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


process.on("SIGINT", () => {
    console.log("Shutting down server...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
// useNewUrlParser:true- ensure the updated url parsing 
// useUnifiedToPology:true- ensure the upated connection managment