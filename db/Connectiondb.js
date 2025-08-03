import mongoose from "mongoose";

const Connectiondb = async () => {
  return await mongoose
    .connect(
      "mongodb+srv://moviesTask:moviesTask1234@cluster0.e09gpvw.mongodb.net/moviesTvshows"
    )
    .then((res) => console.log("ConnectionDB is Running........"))
    .catch((err) => console.log({ message: "fail in ConnectionDB", err }));
};

export default Connectiondb;

// "mongodb+srv://cycle41:cycle41@cluster0.e09gpvw.mongodb.net/movies",

