// Model imports
const ResponseService = require('./ResponseService'); // Response service
const Movie = require('../models/Movie'); // User model

const Types = require('./Types'); //  Types Model
const jwt = require('jsonwebtoken');
// Return model by type

function convertToSlug(Text) {
    return Text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
}

function getCustomSlug(model, title) {
    customSlug = convertToSlug(title);
    let productData =  model.find({ "slug": customSlug });
    let existsData = productData[0];

    if (productData.length) {
        customSlug = existsData.slug + "-" + time;
    } else {
        customSlug = customSlug + "-" + time;
    }
    return customSlug;
}

