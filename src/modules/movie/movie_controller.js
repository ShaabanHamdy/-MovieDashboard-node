import movieModel from "../../../db/models/movie/movie_model.js";
import cloudinary from "../../utils/cloudinary.js";
export const addNewMovie = async (req, res, next) => {
  if (!req.file)
    return next(new Error("please upload the picture", { cause: 400 }));
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `movie/${req.body.title}` }
  );
  const movies = await movieModel.create({
    movieImage: secure_url,
    imageId: public_id,
    title: req.body.title,
    type: req.body.type,
    director: req.body.director,
    budget: req.body.budget,
    location: req.body.location,
    duration: req.body.duration,
    year: req.body.year,
    userId: req.user.id,
  });

  res.json({ message: "success", movies });
};
// ==================================================================
export const getAllUsersMovies = async (req, res, next) => {
  const data = await movieModel
    .find({ userId: req.user.id })
    .sort({ createdAt: -1 });
  if (data.length == 0) {
    return next(new Error("no Movies Or Tv Shows available", { cause: 404 }));
  }
  res.json({ message: "Done", results: data.length, data });
};
// =========================================================
export const getAllmovies = async (req, res, next) => {
  const data = await movieModel.find().sort({ createdAt: -1 });
  if (!data.length) {
    return next(new Error("no Movies Or Tv Shows available"));
  }

  res.json({ message: "Done", results: data.length, data });
};

// ======================================================
export const deleteAllMovies = async (req, res, next) => {
  const movie = await movieModel.deleteMany();
  if (movie.deletedCount < 1)
    return next(new Error("not find any movies ", { cause: 409 }));
  res
    .status(201)
    .json({ message: "success", deletedCount: movie.deletedCount });
};
// ======================================================

export const deleteOnemovie = async (req, res, next) => {
  const movie = await movieModel.findOneAndDelete({
    userId: req.user.id,
    _id: req.body.movie_id,
  });
  if (movie.deletedCount < 1)
    return next(new Error("not find andy movies ", { cause: 409 }));
  res
    .status(201)
    .json({ message: "success", deletedCount: movie.deletedCount });
};

// =========================================================
export const getOneMovie = async (req, res, next) => {
  const movie = await movieModel.findOne({ _id: req.params.movieId });
  if (!movie) {
    return next(new Error("movie id fail"));
  }
  res.json({ message: "success", movie });
};

// ======================================
export const updateMovie = async (req, res, next) => {
  try {
    const movie = await movieModel.findOne({
      userId: req.user.id,
      _id: req.body.movieId,
    });

    if (!movie) {
      return next(new Error("Movie not found", { cause: 404 }));
    }

    let secure_url = movie.movieImage;
    let public_id = movie.imageId;

    // Only upload new image if provided
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "movieApp",
      });
      secure_url = uploaded.secure_url;
      public_id = uploaded.public_id;
    }

    // Build updated fields using old if new not provided
    const updatedMovie = await movieModel.findOneAndUpdate(
      { userId: req.user.id, _id: req.body.movieId },
      {
        $set: {
          title: req.body.title || movie.title,
          type: req.body.type || movie.type,
          director: req.body.director || movie.director,
          budget: req.body.budget || movie.budget,
          location: req.body.location || movie.location,
          duration: req.body.duration || movie.duration,
          year: req.body.year || movie.year,
          movieImage: secure_url,
          imageId: public_id,
        },
      },
      { new: true }
    );

    res.json({ message: "success", updatedMovie });
  } catch (error) {
    next(error);
  }
};
// export const updateMovie = async (req, res, next) => {
//   // if (!(await movieModel.findOne({ _id: req.body.movieId })))
//   //   return next(new Error("movie id fail"));

// let secure_url = "";
// let public_id = "";

// if (req.file) {
//   // assuming you're uploading and transforming with cloudinary
//   const { secure_url: url, public_id: id } = await cloudinary.uploader.upload(req.file.path, {
//     folder: "movieApp",
//   });
//   secure_url = url;
//   public_id = id;
// }
//   const updatedMovie = await movieModel.findOneAndUpdate(
//     { userId: req.user.id, _id: req.body.movieId },
//     {
//       $set: {
//         title: req.body.title,
//         type: req.body.type,
//         director: req.body.director,
//         budget: req.body.budget,
//         location: req.body.location,
//         duration: req.body.duration,
//         year: req.body.year,
//         movieImage: secure_url,
//         imageId: public_id,
//       },
//     },
//     { new: true }
//   );
//   if (!updatedMovie) {
//     return next(new Error("Failed  to update movie ", { cause: 500 }));
//   }

//   res.json({ message: "success", updatedMovie });
// };
