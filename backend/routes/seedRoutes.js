import express from "express";
import Product from "../models/productModel.js";
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
    // It is to remove and return all the objects
    await Product.remove({});
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
});

export default seedRouter;