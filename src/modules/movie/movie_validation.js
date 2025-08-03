import Joi from "joi";

// =============================================================================================================

const addNewMovie = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  movieImage: Joi.any(),
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
    await addNewMovie.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
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
