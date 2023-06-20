import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  deleteVideo,
  getVideo,
  randomVideos,
  search,
  subscribeVideo,
  trendingVideos,
  updateVideo,
  uploadVideo,
  videosByTag,
} from "../controllers/videoController.js";
const router = express.Router();

router.route("/").post(isAuthenticatedUser, uploadVideo);
router
  .route("/:id")
  .put(isAuthenticatedUser, updateVideo)
  .delete(isAuthenticatedUser, deleteVideo)
  .get(getVideo);
router.route("/trend").get(trendingVideos);
router.route("/random").get(randomVideos);
router.route("/sub").get(isAuthenticatedUser, subscribeVideo);
router.route("/tags").get(videosByTag);
router.route("/search").get(search);

export const videoRoutes = router;
