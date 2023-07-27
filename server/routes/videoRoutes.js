import express from "express";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import {
  channelVideos,
  deleteVideo,
  getVideo,
  likedVideos,
  randomVideos,
  savedVideos,
  search,
  subscribed,
  trendingVideos,
  updateVideo,
  uploadVideo,
  videosByTag,
} from "../controllers/videoController.js";
import multer from "multer";
import { storage } from "../cloudinary/index.js";

const upload = multer({ storage });
const router = express.Router();

router
  .route("/")
  .post(isAuthenticatedUser, upload.single("video"), uploadVideo);
router.route("/trend").get(trendingVideos);
router.route("/random").get(randomVideos);
router.route("/subscribed").get(isAuthenticatedUser, subscribed);
router.route("/liked").get(isAuthenticatedUser, likedVideos);
router.route("/saved").get(isAuthenticatedUser, savedVideos);
router.route("/tags").get(videosByTag);
router.route("/search").get(search);
router.route("/channel/:id").get(channelVideos);
router
  .route("/:id")
  .put(isAuthenticatedUser, updateVideo)
  .delete(isAuthenticatedUser, deleteVideo)
  .get(getVideo);

export const videoRoutes = router;
