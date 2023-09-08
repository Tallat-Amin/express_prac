const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


// Connect to MongoDB
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });


// Middleware function to check if a user is authenticated using jwt
function authenticateToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
}

// Middlewares
app.use(express.json()); //express built-in parse object same as body-parser
app.use(express.urlencoded({ extended: true })); // parse complex or nested array/object inside

// Routes
const crudRoutes = require('./crudRoutes');
app.use('/api/crud', crudRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
