import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: { id: string; name: string; role: string };
}

export interface JwtPayload {
  id: string;
  name: string;
  role: string;
}

async function authenticateJWT(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader;

    try {
      const decoded = jwt.verify(token, "123456789") as {
        id: string;
        name: string;
        role: string;
      };
      console.log(decoded);
      req.user = { id: decoded.id, name: decoded.name, role: decoded.role };
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Authorization header missing" });
  }
}

export { authenticateJWT };
