import movieModel from "../../../db/models/movie/movie_model.js";
import { Paginate } from "../../utils/paginate.js";
import cloudinary from "../../utils/cloudinary.js";
export const addNewMovie = async (req, res, next) => {
  if (!req.file)
    return next(Error("please upload your picture", { cause: 400 }));
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
  });

  res.json({ message: "success", movies });
};
// =========================================================
export const getAllmovies = async (req, res, next) => {
  const data = await movieModel.find({}).sort({ createdAt: -1 });

  if (!data.length) {
    return next(new Error("no Movies Or Tv Shows available"));
  }

  res.json({ message: "Done", results: data.length, data });
};

// ======================================================
export const deleteAllMovies = async (req, res, next) => {
  const movie = await movieModel.deleteMany();
  if (movie.deletedCount < 1)
    return next(new Error("not find andy movies ", { cause: 409 }));
  res
    .status(201)
    .json({ message: "success", deletedCount: movie.deletedCount });
};
// ======================================================

export const deleteOnemovie = async (req, res, next) => {
  const movie = await movieModel.deleteOne({ _id: req.body.movie_id });
  if (movie.deletedCount < 1)
    return next(new Error("not find andy movies ", { cause: 409 }));
  res
    .status(201)
    .json({ message: "success", deletedCount: movie.deletedCount });
};

// ==================================================================
export const getAllMoviesUsers = async (req, res, next) => {
  const data = await productModel.find();
  if (data.length == 0) {
    return next(new Error("no products available"));
  }
  res.json({ message: "Done", results: data.length, data });
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
  if (!(await movieModel.findOne({ _id: req.body.movieId })))
    return next(new Error("movie id fail"));

  if (!req.file)
    return next(new Error("please upload your picture", { cause: 400 }));

  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `movie/${req.body.title}` }
  );

  const updatedMovie = await movieModel.findByIdAndUpdate(
    req.body.movieId,
    {
      $set: {
        title: req.body.title,
        type: req.body.type,
        director: req.body.director,
        budget: req.body.budget,
        location: req.body.location,
        duration: req.body.duration,
        year: req.body.year,
        movieImage: secure_url,
        imageId: public_id,
      },
    },
    { new: true }
  );
  if (!updatedMovie) {
    return next(new Error("Failed to update movie", { cause: 500 }));
  }

  res.json({ message: "success", updatedMovie });
};
