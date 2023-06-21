const { body } = require("express-validator");
const movieDataValidateChainMethod = [
    body("movie_name")
      .exists({ checkFalsy: true })
      .withMessage("Movie name is required"),
    body("rating")
      .exists()
      .withMessage("Rating is required"),
     body("released_date")
      .optional()
      .isDate()
      .withMessage("Released Date should be valid date")
    
  ];
  module.exports = {movieDataValidateChainMethod};