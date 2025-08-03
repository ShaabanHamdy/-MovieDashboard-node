// import parsePhoneNumberFromString from 'libphonenumber-js';
import bcrypt from "bcryptjs";
import { mongoose } from "mongoose";

// Declare the Schema of the Mongo model

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be less than 50 characters long"],
      lowercase: true,
      trim: true,
      text: true,
    },
    lastName: {
      type: String,
      required: [true, "name is required"],
      minlength: [3, "Name must be at least 3 characters long"],
      maxlength: [50, "Name must be less than 50 characters long"],
      lowercase: true,
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "email must be unique"],
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: function (v) {
          return /(?=.*[!@#$%^&*])(?=.*[A-Z].*[A-Z])/.test(v);
        },
        message:
          "Password must contain at least one special character and two capital letters",
      },
    }, 
    status: {
      type: String,
      default: "offline",
      enum: ["offline", "online"],
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
  },
  {
    timestamps: true,
  }
);

// hook to hash password
userSchema.pre("save", function (next, doc) {
  this.password = bcrypt.hashSync(this.password, +process.env.SALT_ROUNDS);
  next();
});

//Export the model

const userModel = mongoose.model.User || mongoose.model("User", userSchema);

export default userModel;
