const express = require('express');
// const router = require('./routes'); // Routing module
const app = express();
const port = process.env.PORT || 3200; // Port to run

var cors = require('cors')

    // Connect to database
const mongoose = require('mongoose');
//require('dotenv').config({ path: 'ENV_FILENAME' });
require('dotenv').config();
     

let MONGODB_URI = "mongodb+srv://@cluster0.chhg7.mongodb.net/"
let DB_NAME = "moviedb"
let USERNM = "arpit1011"
let PASS = "arpit1011"
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        user: USERNM,
        pass: PASS,
        dbName: DB_NAME
    })
    .then(() => {
        console.log('mongodb connected...')
    })
    .catch(err => console.log(err.message))

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



app.use(express.static('uploads')); // Uploads directory

// Routing module API v1

app.get('/', async(req, res) => {
 	return res.json({ "done": "working v6" });
});

app.listen(process.env.PORT || port, () => console.log('Server started ! Port -  ' + port));