// Page router
const app = require('express');
const router = app.Router();
const Types = require('../shared/Types') // Model types

// CRUD Service
const CRUD = require('../shared/CRUD')

// Auth middleware
// const CheckAuth = require('../shared/middleware/AuthMiddleware')

// // Create
router.post('/', (req, res) => CRUD.create(req.body, Types.MOVIE, res));

// // Update
// router.put('/:id', CheckAuth, (req, res) => CRUD.updateById(req.params.id, req.body, Types.PAGE, res));
// Get all  
router.get('/', (req, res) => CRUD.getByQueryPaginateWithoutSort({},
    req.query.limit ? parseInt(req.query.limit) : 10,
    req.query.page ? parseInt(req.query.page) : 0,
    Types.MOVIE,
    res));



module.exports = router;