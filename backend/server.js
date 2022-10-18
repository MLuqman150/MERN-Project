import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

// used to fetch variables from .env file
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to the DB");
}).catch((err) => {
    console.log(err.message);
});

const app = express();

app.use('/api/seed', seedRouter);

// A test
app.use('/api/products', productRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`serving at http://localhost:${port}`);
})