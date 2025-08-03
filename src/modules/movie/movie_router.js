import * as movieConnection from "./movie_controller.js";
import { Router } from "express";
import auth from "../../utils/auth.js";
import { asyncHandling } from "../../utils/error_handling.js";
import { myMulter } from "../../utils/multer.js";
import * as movieValidation from "./movie_validation.js";
const router = Router();

router.post(
  "/addNewMovie",
  myMulter().fields([{ name: "movieImage", maxCount: 1 }]),
  // movieValidation.addNewMovieValidation,
  asyncHandling(movieConnection.addNewMovie)
);

// ========================================================================

router.get("/getAllmovies", asyncHandling(movieConnection.getAllmovies));
// ========================================================================

router.get(
  "/getAllMoviesUsers",
  auth(),
  asyncHandling(movieConnection.getAllMoviesUsers)
);
// ========================================================================
// ========================================================================
router.delete(
  "/deleteAllMovies",
  asyncHandling(movieConnection.deleteAllMovies)
);

// ========================================================================
router.delete(
  "/deleteOnemovie",
  asyncHandling(movieConnection.deleteOnemovie)
);

// ========================================================================
router.get("/getOneMovie/:movieId", asyncHandling(movieConnection.getOneMovie));

// ========================================================================
router.put(
  "/updateMovie",
  myMulter().fields([{ name: "movieImage", maxCount: 1 }]),
  // movieValidation.editMovieValidation,
  asyncHandling(movieConnection.updateMovie)
);



export default router;
