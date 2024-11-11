import mongoose, { Document, Schema, model } from "mongoose";

// 1. Define the User Interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "patient" | "doctor";
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the User Schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["patient", "doctor"],
      default: "patient",
    },
  },
  {
    timestamps: true,
  }
);

// 3. Create and Export the User Model
const User = model<IUser>("User", userSchema);
export default User;
