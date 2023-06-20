import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler(401, "Please login to access this resource"));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);

  next();
});
