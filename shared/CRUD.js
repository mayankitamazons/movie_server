// Model imports
const ResponseService = require('../shared/ResponseService'); // Response service
const Movie = require('../models/Movie'); // User model
const Types = require('../shared/Types'); //  Types Model
const jwt = require('jsonwebtoken');
const { validationResult } = require("express-validator");
// Return model by type




function getModelByType(type) {

    switch (type) {
        case Types.MOVIE:
            return Movie;
        

    }
}

// Return new model instance by type
function createNewModelInstanceByName(type, val) {
    switch (type) {
        case Types.MOVIE:
            return new Movie(val);
    }
}

// Create
exports.create = function (val, type, res) {
    try {
        const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
        const model = createNewModelInstanceByName(type, val);
    model.save().then(function (err, doc) {
        ResponseService.generalPayloadResponse(err, doc, res);
    })
    .catch(function (err) {
        console.log('error to save',err);
      //  ResponseService.generalPayloadResponse(err);
    });
    // model.save((err, val) => {
    //     ResponseService.generalPayloadResponse(err, val, res);
    // });
    }
    catch (err) {
        console.log('error to save',err);
      }
    
} 


// get by slug 
exports.getBySlug = function (slug, type, res) {
    const model = getModelByType(type);
    model.find({ slug: slug }, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res);
    });
}

/* Read by query
 [X] PAGINATION
 [X] SORTING
 [X] LIMIT
 */
exports.getByQuery = function (query, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res);
    });
}

/* Read n items by query [ NO PAGINATION ]
 [X] PAGINATION
 [X] SORTING
 [/] LIMIT
 */
exports.getByQueryLimit = function (query, limit, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res);
    }).limit(limit);
}

/* Read n items by query [ NO PAGINATION ]
 [X] PAGINATION
 [/] SORTING
 [/] LIMIT
 */
exports.getByQueryLimitAndSort = function (query, limit, sortQuery, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res);
    }).sort(sortQuery).limit(limit);
}

/* Read n items by query [ NO PAGINATION ]
 [X] PAGINATION
 [/] SORTING
 [X] LIMIT
 */
exports.getByQueryAndSort = function (query, sortQuery, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res);
    }).sort(sortQuery);
}

/* Read n items by query [ NO PAGINATION ]
 [/] PAGINATION
 [/] SORTING
 [/] LIMIT
 */
exports.getByQueryPaginate = function (query, limit, sortQuery, page, type, res) {
    const model = getModelByType(type);
    model.find(query, (err, doc) => {
        ResponseService.generalPayloadResponse(err, doc, res);
    }).sort(sortQuery).skip(page * limit).limit(limit);
}

/* Read n items by query [ NO PAGINATION ]
 [/] PAGINATION
 [X] SORTING
 [/] LIMIT
 */
exports.getByQueryPaginateWithoutSort = function (query, limit, page, type, res) {
    const model = getModelByType(type);
   
    model.find(query).skip(page * limit).limit(limit).sort({ _id: -1 })
.then(function (data, doc) {
    ResponseService.generalPayloadResponse(null,data, res);
})
.catch(function (err) {
    ResponseService.generalPayloadResponse(err);
});

}



// SPECIAL METHODS
// Get doc count
exports.countByQuery = function (query, type, res) {
    const model = getModelByType(type);
    query.status = 1;
    model.countDocuments(query, (err, count) => {
        ResponseService.generalPayloadResponse(err, { count: count }, res);
    });
}

exports.alphaId = function () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 12; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


exports.convertToSlug = function (Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}