import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoConn from "./database/db";

import indexRoute from "../src/routes";

var app = express();

mongoConn()
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send("Server is up");
});

app.use("/api/v1", indexRoute);

var PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
