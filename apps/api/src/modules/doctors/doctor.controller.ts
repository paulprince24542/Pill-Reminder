import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../../middleware/authorization";
import BookingModel from "../../models/Booking";

class DoctorController {
  async fetchBooking(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      var findBookings = await BookingModel.find({
        doctor_id: req.user?.id,
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

  async addPrescription(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      var body = req.body;
      console.log(body)

      const updatedBooking = await BookingModel.findByIdAndUpdate(
        { _id: body.booking_id },
        {
          $push: { prescription: body.prescriptions },
        },
        { new: true }
      );
      if (updatedBooking) {
        res.status(200).json({
          status: true,
          message: "Prescription Added",
          bookings: updatedBooking,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Failed to add prescription",
          bookings: updatedBooking,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchPrescription(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      var params = req.params;
      console.log("ewfew",req.query)
      console.log(params);
      var findPrescription = await BookingModel.find({
        _id: req.params?.id,
      });

      if (findPrescription.length > 0) {
        res.status(200).json({
          status: true,
          data: findPrescription[0].prescription,
        });
      } else {
        res.status(400).json({
          status: false,
          data: findPrescription,
        });
      }
    } catch (error) {}
  }
}

var doctorController = new DoctorController();
export default doctorController;
