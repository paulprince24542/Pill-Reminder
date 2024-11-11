import { Router } from "express";
import { bookingController } from "./booking.controller";
import { authenticateJWT } from "../../middleware/authorization";

var authRoutes = Router();

authRoutes.get("/fetch", authenticateJWT, bookingController.fetchBooking);
authRoutes.post("/add", authenticateJWT, bookingController.addBooking);
authRoutes.get("/doctor", authenticateJWT, bookingController.fetchDoctor);

export default authRoutes;
