import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/User.js";
import { Video } from "../models/Video.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

export const uploadVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

  if (!title || !description) {
    return next(new ErrorHandler(400, "Every field is required!"));
  }

  // const uploadedThumbnail = await cloudinary.v2.uploader.upload(thumbnail, {
  //   folder: "video-sharing-app/thumbnails",
  //   aspect_ratio: "16:9",
  //   crop: "thumb",
  // });

  const uploadedVideo = await cloudinary.v2.uploader.upload(dataURI, {
    resource_type: "video",
    folder: "video-sharing-app/videos",
  });

  const video = await Video.create({
    title,
    description,
    uploader: req.user._id,
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

export const updateVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;

  let video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorHandler(404, "Video not found!"));
  }

  if (req.user._id !== video.uploader) {
    return next(new ErrorHandler(403, "You can upload only your video!"));
  }

  video = await Video.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { new: true }
  );

  res.status(200).json({ success: true, video });
});

export const deleteVideo = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorHandler(404, "Video not found!"));
  }

  if (req.user._id !== video.uploader) {
    return next(new ErrorHandler(403, "You can delete only your video!"));
  }

  await cloudinary.v2.uploader.destroy(video.thumbnail.public_id);
  await cloudinary.v2.uploader.destroy(video.video.public_id);

  await Video.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, message: "The video has been deleted" });
});

export const getVideo = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.findById(req.params.id).populate(
    "uploader",
    "name email avatar"
  );

  if (!video) {
    return next(new ErrorHandler(404, "Video not found!"));
  }

  res.status(200).json({ success: true, video });
});

export const trendingVideos = catchAsyncErrors(async (req, res, next) => {
  const videos = await Video.find()
    .sort({ views: -1 })
    .populate("uploader", "name email avatar");

  res.status(200).json({ success: true, videos });
});

export const randomVideos = catchAsyncErrors(async (req, res, next) => {
  const videos = await Video.aggregate([{ $sample: { size: 40 } }]).populate(
    "uploader",
    "name email avatar"
  );
  res.status(200).json({ success: true, videos });
});

export const subscribed = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const videos = await Video.find({
    uploader: { $in: user.subscribedUsers },
  })
    .populate("uploader")
    .sort((a, b) => b.createdAt - a.createdAt);

  res.status(200).json({ success: true, videos });
});

export const videosByTag = catchAsyncErrors(async (req, res, next) => {
  const tags = req.query.tags.split(",");

  const videos = await Video.find({ tags: { $in: tags } }).limit(20);

  res.status(200).json({ success: true, videos });
});

export const search = catchAsyncErrors(async (req, res, next) => {
  const query = req.query.q;

  const videos = await Video.find({
    title: { $regex: query, $options: "i" },
  }).limit(40);

  res.status(200).json({ success: true, videos });
});
