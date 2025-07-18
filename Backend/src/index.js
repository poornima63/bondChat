
import dotenv from "dotenv";
import express  from "express";

import authRoutes from './routes/auth.route.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT;
import connectTOmongoDB from "./lib/database.js";
connectTOmongoDB()

app.use(express.json())
app.use('/api/auth',authRoutes);

app.listen(PORT, ()=>{
    console.log(`server is listening on the ${PORT} `)
});