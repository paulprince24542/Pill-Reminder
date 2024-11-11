import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// ! Model
import UserModel from "../../models/User";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      var body = req.body;
      var findUser = await UserModel.findOne({
        email: body.email,
      });
      if (findUser) {
        if (findUser.password == body.password) {
          var auth_token = await jwt.sign(
            {
              id: findUser.id,
              name: findUser.name,
              role: findUser.role,
            },
            "123456789"
          );
          res.status(200).json({
            status: true,
            user: findUser,
            token: auth_token,
          });
        } else {
          res.status(400).json({
            status: false,
            message: "Incorrect Passworrd",
            user: [],
          });
        }
      } else {
        res.status(400).json({
          status: false,
          message: "User not found",
          user: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      var body = req.body;
      var findUser = await UserModel.findOne({
        email: body.email,
      });
      if (findUser) {
        res
          .status(400)
          .json({ status: false, message: "Email already exists" });
      } else {
        const newUser = new UserModel({
          name: body.name,
          email: body.email,
          password: body.password,
          role: body.role,
        });
        var userAdded = await newUser.save();
        if (userAdded) {
          res.status(201).json({
            status: true,
            message: "User created successfully",
            user: newUser,
          });
        } else {
          res.status(400).json({
            status: false,
            message: "Failed to created user",
            user: [],
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

var authController = new AuthController();

export { authController };
