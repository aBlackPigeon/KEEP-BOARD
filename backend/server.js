import express from 'express';
import { connectDb } from './db/connectDB.js';
import dotenv from 'dotenv';
import notesRoute from './routes/notes.routes.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();
const PORT = 5001
const app = express();

app.use(express.json());
app.use(rateLimiter);
app.use('/api/notes', notesRoute);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("Server started at PORT" , PORT);
    });
});


