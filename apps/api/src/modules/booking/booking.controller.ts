import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import BookingModel from "../../models/Booking";

// ! Model
import UserModel from "../../models/User";
import { CustomRequest } from "../../middleware/authorization";

class BookingController {
  async fetchBooking(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      var findBookings = await BookingModel.find({
        user_id: req.user?.id,
      });
      if (findBookings.length > 0) {
        res.status(200).json({
          status: true,
          bookings: findBookings,
        });
      } else {
        res.status(400).json({
          status: false,
          bookings: findBookings,
        });
      }
    } catch (error) {}
  }

  async addBooking(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      var body = req.body;
      var newBooking = new BookingModel({
        reasonForVisit: body.reasonForVisit,
        description: body.description,
        bookingDate: body.bookingDate,
        doctor_id: body.doctor_id,
        user_id: req.user?.id,
      });
      var bookingAdded = await newBooking.save();
      if (bookingAdded) {
        res.status(200).json({
          status: true,
          message: "Booking added",
          booking: bookingAdded,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Failed to add booking",
          booking: bookingAdded,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchDoctor(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      var findDoctor = await UserModel.find({
        role: "doctor",
      });
      if (findDoctor) {
        res.status(200).json({
          status: true,
          message: "Doctors found",
          doctors: findDoctor,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Doctors not found",
          doctors: findDoctor,
        });
      }
    } catch (error) {}
  }
}

var bookingController = new BookingController();

export { bookingController };
