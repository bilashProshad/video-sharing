import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Comment } from "../models/Comment.js";
import { User } from "../models/User.js";
import { Video } from "../models/Video.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

export const addComment = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const { comment } = req.body;

  const video = await Video.findById(id);

  if (!video) {
    next(new ErrorHandler(404, "Video not found"));
  }

  let newComment = await Comment.create({
    comment,
    author: req.user._id,
    video: id,
  });

  newComment = await User.populate(newComment, {
    path: "author",
    select: "name email avatar",
  });

  video.comments.push(newComment._id);
  await video.save();

  res.status(201).json({ success: true, comment: newComment });
});

export const getComments = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const video = await Video.findById(id);

  if (!video) {
    next(new ErrorHandler(404, "Video not found"));
  }

  const comments = await Comment.find({ video: id }).populate("author");

  res.status(200).json({ success: true, comments });
});

export const updateComment = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const commentId = req.params.commentId;
  const { comment } = req.body;

  const video = await Video.findById(id);
  if (!video) {
    next(new ErrorHandler(404, "Video not found"));
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { comment },
    { new: true }
  );

  res.status(200).json({ success: true, comment: updatedComment });
});

export const deleteComment = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const commentId = req.params.commentId;

  const video = await Video.findByIdAndUpdate(id, {
    $pull: { comments: commentId },
  });
  if (!video) {
    next(new ErrorHandler(404, "Video not found"));
  }

  await Comment.findByIdAndDelete(commentId);

  res
    .status(200)
    .json({ success: true, message: "Comment deleted successfully" });
});
