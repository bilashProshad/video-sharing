import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Video } from "../models/Video.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

export const uploadVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, description, thumbnail } = req.body;

  if (!title || !description || !thumbnail || !req.body.video) {
    return next(new ErrorHandler(400, "Every field is required!"));
  }

  const uploadedThumbnail = await cloudinary.v2.uploader.upload(thumbnail, {
    folder: "video-sharing-app/thumbnails",
    aspect_ratio: "16:9",
    crop: "thumb",
  });

  const uploadedVideo = await cloudinary.v2.uploader.upload(req.body.video, {
    folder: "video-sharing-app/videos",
  });

  const video = await Video.create({
    title,
    description,
    uploader: req.user._id,
    thumbnail: {
      public_id: uploadedThumbnail.public_id,
      url: uploadedThumbnail.secure_url,
    },
    video: {
      public_id: uploadedVideo.public_id,
      url: uploadedVideo.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    video,
  });
});

export const updateVideo = catchAsyncErrors(async (req, res, next) => {});

export const deleteVideo = catchAsyncErrors(async (req, res, next) => {});

export const getVideo = catchAsyncErrors(async (req, res, next) => {});

export const trendingVideos = catchAsyncErrors(async (req, res, next) => {});

export const randomVideos = catchAsyncErrors(async (req, res, next) => {});

export const subscribeVideo = catchAsyncErrors(async (req, res, next) => {});

export const videosByTag = catchAsyncErrors(async (req, res, next) => {});

export const search = catchAsyncErrors(async (req, res, next) => {});
