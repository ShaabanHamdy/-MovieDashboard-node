import { Router } from "express";
import auth from "../../utils/auth.js";
import { asyncHandling } from "../../utils/error_handling.js";
import { myMulter } from "../../utils/multer.js";
import * as movieConnection from "./movie_controller.js";
import * as movieValidation from "./movie_validation.js";
const router = Router();

router.post(
  "/addNewMovie",
  auth(),
  myMulter({}).single("movieImage"),
  movieValidation.addNewMovieValidation,
  asyncHandling(movieConnection.addNewMovie)
);

// ========================================================================

router.get("/getAllmovies", asyncHandling(movieConnection.getAllmovies));
// ========================================================================

router.get(
  "/getAllUsersMovies",
  auth(),
  asyncHandling(movieConnection.getAllUsersMovies)
);
// ========================================================================
router.delete(
  "/deleteAllMovies",

  asyncHandling(movieConnection.deleteAllMovies)
);

// ========================================================================
router.delete(
  "/deleteOnemovie",
  auth(),
  asyncHandling(movieConnection.deleteOnemovie)
);

// ========================================================================
router.get(
  "/getOneMovie/:movieId",

  asyncHandling(movieConnection.getOneMovie)
);

// ========================================================================
router.put(
  "/updateMovie",
  auth(),
  myMulter({}).single("movieImage"),
  asyncHandling(movieConnection.updateMovie)
);

export default router;
