import express from 'express';
import { connectDb } from './db/connectDB.js';
import dotenv from 'dotenv';
import notesRoute from './routes/notes.routes.js';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path'

dotenv.config();
const PORT = 5001
const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);



app.use('/api/notes', notesRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*" , (req,res) => {
    res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
});
}

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at PORT" , PORT);
    });
});


