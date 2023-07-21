import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/User.js";
import { Video } from "../models/Video.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendJwtToken.js";
import cloudinary from "cloudinary";

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

export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  res.status(200).json({ success: true, user });
});

export const getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  res.status(200).json({ success: true, user });
});

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true }
  );
  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }

  res.status(200).json({ success: true, user });
});

export const updateAvatar = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.avatar && user.avatar.public_id) {
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
  }

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

  const uploadedAvatar = await cloudinary.v2.uploader.upload(dataURI, {
    resource_type: "image",
    folder: "video-sharing-app/image",
    width: 250,
    crop: "scale",
  });

  user.avatar = {
    public_id: uploadedAvatar.public_id,
    url: uploadedAvatar.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});

export const subscribe = catchAsyncErrors(async (req, res, next) => {
  if (req.user._id === req.params.id) {
    return next(new ErrorHandler(400, "You can't subscribe your own channel"));
  }

  await User.findByIdAndUpdate(req.user._id, {
    $push: { subscribedUsers: req.params.id },
  });

  await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: 1 } });

  res.status(200).json({ success: true, message: "Subscription successfull" });
});

export const unsubscribe = catchAsyncErrors(async (req, res, next) => {
  if (req.user._id === req.params.id) {
    return next(
      new ErrorHandler(400, "You can't unsubscribe your own channel")
    );
  }

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { subscribedUsers: req.params.id },
  });

  await User.findByIdAndUpdate(req.params.id, { $inc: { subscribers: -1 } });

  res
    .status(200)
    .json({ success: true, message: "Unsubscription successfull" });
});

export const like = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id;

  await Video.findByIdAndUpdate(req.params.id, {
    $addToSet: { likes: id },
    $pull: { dislikes: id },
  });

  res.status(200).json({ success: true, message: "The video has been liked." });
});

export const unlike = catchAsyncErrors(async (req, res, next) => {
  const id = req.user._id;

  await Video.findByIdAndUpdate(req.params.id, {
    $addToSet: { dislikes: id },
    $pull: { likes: id },
  });

  res
    .status(200)
    .json({ success: true, message: "The video has been disliked." });
});
