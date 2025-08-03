import mongoose from "mongoose";

const Connectiondb = async () => {
  return await mongoose
    .connect(process.env.MONGODB )
    .then((res) => console.log("ConnectionDB is Running........"))
    .catch((err) => console.log({ message: "fail in ConnectionDB", err }));
};

export default Connectiondb;


