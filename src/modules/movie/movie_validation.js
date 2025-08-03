import Joi from "joi";
import movieModel from "../../../db/models/movie/movie_model.js";

const isUnique = async (value, helpers) => {
  const exists = await movieModel.exists({ title: value });
  if (exists) {
    return helpers.message("title must be unique");
  }
  return value;
};
// =============================================================================================================

const addNewMovie = Joi.object({
  title: Joi.string().external(isUnique).required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  movieImage: Joi.string().required().messages({
    "string.empty": "Movie image cannot be empty",
    "any.required": "Movie image is required",
  }),
  type: Joi.string().required().messages({
    "string.empty": "Type cannot be empty",
    "any.required": "Type is required",
  }),
  director: Joi.string().required().messages({
    "string.empty": "Director cannot be empty",
    "any.required": "Director is required",
  }),
  
  budget: Joi.string().required().messages({
    "string.empty": "Budget cannot be empty",
    "any.required": "Budget is required",
  }),

  location: Joi.string().required().messages({
    "string.empty": "Location cannot be empty",
    "any.required": "Location is required",
  }),
  duration: Joi.string().required().messages({
    "string.empty": "Duration cannot be empty",
    "any.required": "Duration is required",
  }),
  year: Joi.string().required().messages({
    "string.empty": "Year cannot be empty",
    "any.required": "Year is required",
  }),
});
export const addNewMovieValidation = async (req, res, next) => {
  try {
    // Asynchronously validate the request body
    await addNewMovie.validateAsync(req.body, { abortEarly: false });
    next(); // Proceed to the next middleware or route handler if validation passes
  } catch (error) {
    // Handle validation errors
    return res.status(400).json({
      success: false,
      status: "Validation failed",
      message: error.details.map((err) => err.message),

      // Extracting error messages
    });
  }
};

// =============================================================================================================
