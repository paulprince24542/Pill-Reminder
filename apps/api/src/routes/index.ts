import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import bookingRoute from "../modules/booking/booking.route";
import doctorRoutes from "../modules/doctors/doctor.route";

var routes = Router();

routes.use("/user/auth", authRoutes);
routes.use("/user/bookings", bookingRoute);
routes.use("/user/doctor", doctorRoutes);

export default routes;
