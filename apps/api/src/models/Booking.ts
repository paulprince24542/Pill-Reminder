import mongoose, { Document, Schema, model } from "mongoose";
import { IUser } from "./User";

interface Prescription {
  medicine_name: string;
  quantity: number;
  duration: number;
}

const prescriptionSchema = new Schema({
  medicine_name: String,
  quantity: Number,
  duration: String,
});

// 1. Define the User Interface
export interface IBooking extends Document {
  reasonForVisit: string;
  bookingDate: Date;
  doctor_id: IUser["_id"];
  user_id: IUser["_id"];
  description: string;
  prescription: Prescription[];
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Define the User Schema
const bookingSchema = new Schema<IBooking>(
  {
    reasonForVisit: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    doctor_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prescription: [prescriptionSchema],
  },
  {
    timestamps: true,
  }
);

// 3. Create and Export the User Model
const Booking = model<IBooking>("Booking", bookingSchema);
export default Booking;
