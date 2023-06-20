const app = require('express');
const router = app.Router();
const Types = require('../shared/Types') // Model types

// CRUD Service
const CRUD = require('../shared/CRUD')
// API v1 routes
// Movie routes
const movieRoutes = require('./movieRoutes');
router.use('/movie', movieRoutes);
module.exports = router;