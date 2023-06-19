import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/User.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendJwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return next(
      new ErrorHandler(400, "Please enter your name, email & password")
    );
  }

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler(
        400,
        "Please enter your password and confirm password must be same"
      )
    );
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(
      new ErrorHandler(400, "You are already registered with this email")
    );
  }

  user = await User.create({ name, email, password });

  sendToken(user, 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Please enter your email & password"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  const passwordMatched = await user.comparePassword(password);
  if (!passwordMatched) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  sendToken(user, 200, res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    user: null,
    message: "Successfully logged out",
  });
});
