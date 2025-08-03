import Joi from "joi";

// =============================================================================================================

const signupSchema = Joi.object({
  firstName: Joi.string().max(30).required().messages({
    "string.empty": "First Name Cannot be empty",
    "string.max": "First Name should have a maximum length of {#limit}",
    "any.required": "First Name is required",
  }),
  lastName: Joi.string().max(50).required().messages({
    "string.empty": "Last Name cannot be empty",
    "string.max": "Last Name should have a maximum length of {#limit}",
    "any.required": "Last Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .pattern(new RegExp("^(?=.*[A-Z]{2,})(?=.*[!@#$%^&*]).*$"))
    .messages({
      "string.pattern.base":
        "Password must contain at least two uppercase letters and one special character",
      "string.min": "Password must be at least {#limit} characters long",
      "any.required": "Password is required",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
    "any.required": "Confirm password is required",
  }),
});
export const signupValidation = async (req, res, next) => {
  try {
    // Asynchronously validate the request body
    await signupSchema.validateAsync(req.body, { abortEarly: false });
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
