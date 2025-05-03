const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookiesParser = require('cookie-parser');
// const connectDB=require("./db")


const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT ;

// Middleware
app.use(cors({
    origin: ["http://localhost:3000"], 
    credentials: true
  }));
  
app.use(express.json());
app.use(cookiesParser());

mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log("mogoose is connected"))
.catch((error)=>console.log("error connecting mongodb",error));
// connectDB();

// Routes
// app.get('/', (req, res) => {
//   res.send('Habit Tracker API');
// });

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));