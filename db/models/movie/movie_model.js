import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    director: { type: String, required: true },
    budget: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    year: { type: String, required: true },
    movieImage:   String ,
    imageId: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const movieModel =
  mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default movieModel;
