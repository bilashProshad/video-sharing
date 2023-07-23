import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  addComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router
  .route("/:id/comments")
  .post(isAuthenticatedUser, addComment)
  .get(getComments);

router
  .route("/:id/comments/:commentId")
  .put(isAuthenticatedUser, updateComment)
  .delete(isAuthenticatedUser, deleteComment);

export const commentRoutes = router;
