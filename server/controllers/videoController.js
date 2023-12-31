import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/User.js";
import { Video } from "../models/Video.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";

export const uploadVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;
  let tags = req.body.tags;

  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

  if (!title || !description || !tags) {
    return next(new ErrorHandler(400, "Every field is required!"));
  }

  tags = JSON.parse(tags);

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
    tags,
  });

  res.status(201).json({
    success: true,
    video,
  });
});

export const updateVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;
  const tags = JSON.parse(req.body.tags);

  let video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorHandler(404, "Video not found!"));
  }

  if (!req.user._id.equals(video.uploader)) {
    return next(new ErrorHandler(403, "You can upload only your video!"));
  }

  video = await Video.findByIdAndUpdate(
    req.params.id,
    { title, description, tags },
    { new: true }
  );

  res.status(200).json({ success: true, video });
});

export const deleteVideo = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video) {
    return next(new ErrorHandler(404, "Video not found!"));
  }

  if (!req.user._id.equals(video.uploader)) {
    return next(new ErrorHandler(403, "You can delete only your video!"));
  }

  await cloudinary.v2.uploader.destroy(video.video.public_id);

  await Video.findByIdAndDelete(req.params.id);

  res
    .status(200)
    .json({ success: true, message: "The video has been deleted" });
});

export const getVideo = catchAsyncErrors(async (req, res, next) => {
  let liked = false;
  let disliked = false;
  let subscribed = false;
  let saved = false;

  let video = await Video.findById(req.params.id)
    .populate("uploader", "name email avatar subscribers")
    .populate("comments");

  video = await User.populate(video, {
    path: "comments.author",
    select: "name email avatar",
  });

  if (!video) {
    return next(new ErrorHandler(404, "Videos not found!"));
  }

  video.views = video.views + 1;
  await video.save();

  const { token } = req.cookies;

  if (!token) {
    return res
      .status(200)
      .json({ success: true, video, liked, disliked, subscribed, saved });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const isUserSubscribed = await User.findOne({
    _id: video.uploader._id,
    subscribedUsers: decodedData.id,
  });

  subscribed = !!isUserSubscribed;

  const user = await User.findById(decodedData.id).select("+savedVideos");

  const savedVideos = user.savedVideos.map((video) => video.toString());
  if (savedVideos.includes(req.params.id)) {
    saved = true;
  } else {
    saved = false;
  }

  const isUserLiked = await Video.findOne({
    _id: req.params.id,
    likes: decodedData.id,
  });
  liked = !!isUserLiked;

  const isUserDisliked = await Video.findOne({
    _id: req.params.id,
    dislikes: decodedData.id,
  });
  disliked = !!isUserDisliked;

  res
    .status(200)
    .json({ success: true, video, liked, disliked, subscribed, saved });
});

export const trendingVideos = catchAsyncErrors(async (req, res, next) => {
  const videos = await Video.find()
    .sort({ views: -1 })
    .populate("uploader", "name email avatar");

  res.status(200).json({ success: true, videos });
});

export const randomVideos = catchAsyncErrors(async (req, res, next) => {
  let videos = await Video.aggregate([{ $sample: { size: 40 } }]);

  // .populate(
  //   "uploader",
  //   "name email avatar"
  // );

  videos = await User.populate(videos, {
    path: "uploader",
    select: "name email avatar",
  });
  res.status(200).json({ success: true, videos });
});

export const subscribed = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const videos = await Video.find({
    uploader: { $in: user.subscribedChannels },
  })
    .populate("uploader", "name email avatar")
    .sort({ createdAt: -1 });

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

export const channelVideos = catchAsyncErrors(async (req, res, next) => {
  let subscribed = false;
  const id = req.params.id;

  const videos = await Video.find({ uploader: id }).sort({ createdAt: -1 });
  const totalVideos = await Video.countDocuments({ uploader: id });

  if (!videos) {
    return next(new ErrorHandler(404, "Videos not found"));
  }

  const channel = await User.findById(id);

  const { token } = req.cookies;

  if (!token) {
    return res
      .status(200)
      .json({ success: true, videos, subscribed, channel, totalVideos });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  const isUserSubscribed = await User.findOne({
    _id: id,
    subscribedUsers: decodedData.id,
  });
  subscribed = !!isUserSubscribed;

  res
    .status(200)
    .json({ success: true, videos, subscribed, channel, totalVideos });
});

export const likedVideos = catchAsyncErrors(async (req, res, next) => {
  const videos = await Video.find({ likes: req.user._id })
    .populate("uploader", "name email avatar")
    .sort({ createdAt: -1 });

  if (!videos) {
    return next(new ErrorHandler(404, "Videos not found"));
  }
  res.status(200).json({ success: true, videos });
});

export const savedVideos = catchAsyncErrors(async (req, res, next) => {
  let user = await User.findById(req.user._id).populate({
    path: "savedVideos",
    populate: { path: "uploader", select: "name email avatar" },
  });

  res.status(200).json({ success: true, videos: user.savedVideos });
});
