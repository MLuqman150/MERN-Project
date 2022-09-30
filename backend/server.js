import express from 'express';
import data from './data.js';

const app = express();
// A test
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

// For the product page
app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find((x) => x.slug === req.params.slug);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: 'Product not found' });
    }
});

// For checking the quantity of certain product in the inventory
app.get('/api/products/:id', (req, res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({ message: 'Product not found' });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`serving at http://localhost:${port}`);
})