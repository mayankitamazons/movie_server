const express = require("express");
const cors = require("cors");
const router = require('./routes'); // Routing module
const mongoose = require("mongoose");

// const messageRoutes = require("./routes/messages");
const app = express();
require("dotenv").config();
mongoose.connect('mongodb+srv://arpit1011:arpit1011@cluster0.chhg7.mongodb.net/moviedb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.log('Error connecting to MongoDB Atlas:', error);
});
// Body parsing as JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());
// Enable cors
app.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update later
    // Allowed headers
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    // Allowed request methods
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH,OPTIONS"
    );
    next();
});
app.use('/v1', router);
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);


