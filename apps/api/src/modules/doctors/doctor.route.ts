import { Router } from "express";

import { authenticateJWT } from "../../middleware/authorization";
import doctorController from "./doctor.controller";

var doctorRoutes = Router();

doctorRoutes.get(
  "/bookings/fetch",
  authenticateJWT,
  doctorController.fetchBooking
);
doctorRoutes.post(
  "/bookings/prescription/add",
  authenticateJWT,
  doctorController.addPrescription
);
doctorRoutes.get(
  "/bookings/prescription/fetch/:id",
  authenticateJWT,
  doctorController.fetchPrescription
);
// authRoutes.get("/doctor", authenticateJWT, bookingController.fetchDoctor);

export default doctorRoutes;
