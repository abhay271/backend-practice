const express = require('express');
const app = express();

// Route 1
app.get('/users',(req, res, next) => {console.log("hello world"); next();});

app.get('/users', (req, res, next) => {
    next(new Error('User database failed'));
});

// Route 2
app.get('/products', (req, res, next) => {
    next(new Error('Products service unavailable'));
});

// Centralized error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.message);
});

app.listen(3000, () => console.log('Server running'));
