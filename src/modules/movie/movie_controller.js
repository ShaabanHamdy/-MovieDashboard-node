import movieModel from "../../../db/models/movie/movie_model.js";
import { Paginate } from "../../utils/paginate.js";

export const addNewMovie = async (req, res, next) => {
  if (!req.files) {
    next(new Error("please select product picture", { cause: 400 }));
  }
  if (await movieModel.findOne({ title: req.body.title }))
    return next(new Error("there is a movie with this name"));

  const movies = await movieModel.create({
    movieImage: req.files?.movieImage.map(
      (e) => "https://movie-dashboard-node.vercel.app/" + e.path
    ),
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
  // const { skip, limit } = Paginate(req.query.page, req.query.size);
  const data = await movieModel
    .find({
      $or: [{ title: { $regex: req.query.search || "", $options: "i" } }],
    })
    .sort({ createdAt: -1 });
  // .limit(limit)
  // .skip(skip)

  if (data.length == 0) {
    next(new Error("no products available"));
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
  // const {limit,skip} = paginate(req.query.page , req.query.size)
  const data = await productModel.find();
  // .limit(limit).skip(skip)

  if (data.length == 0) {
    next(new Error("no products available"));
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
  // const movie = await movieModel.findOne({ _id: req.body.movieId });
  // console.log(movie);
  if (!(await movieModel.findOne({ _id: req.body.movieId })))
    return next(new Error("movie id fail"));

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
        movieImage: req.files?.movieImage.map(
          (e) => "https://movie-dashboard-node.vercel.app/" + e.path
        ),
      },
    },
    { new: true }
  );
  if (!updatedMovie) {
    return next(new Error("Failed to update movie", { cause: 500 }));
  }

  res.json({ message: "success", updatedMovie });
};
