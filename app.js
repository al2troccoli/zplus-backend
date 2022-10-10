const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet')
const compression = require('compression')

const app = express();
const MONGODB_URI = process.env.MONGO_KEY

// Importing the Animals routes
const animalRoutes = require('./routes/animals');

// Configuring bodyParser to accept json body payloads in requests
app.use(bodyParser.json());
// app.use('/images', express.static(path.join(__dirname, 'public', 'images')))

// CORS config
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(helmet());
app.use(compression());

// Set the /animals middleware
app.use('/animals', animalRoutes);

// Handling errors
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// Mongoose configuration
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(process.env.ZPLUS_BACKEND_PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
