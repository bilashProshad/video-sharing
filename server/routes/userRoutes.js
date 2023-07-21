import express from "express";
import {
  getProfile,
  getUser,
  like,
  login,
  logout,
  register,
  subscribe,
  unlike,
  unsubscribe,
  updateAvatar,
  updateProfile,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
import { storage } from "../cloudinary/index.js";
import multer from "multer";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";

const upload = multer({ storage });
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router
  .route("/")
  .post(isAuthenticatedUser, getProfile)
  .put(isAuthenticatedUser, updateProfile);

router
  .route("/avatar")
  .put(
    isAuthenticatedUser,
    catchAsyncErrors(upload.single("image")),
    updateAvatar
  );

router.route("/find/:id").get(getUser);
router.route("/sub/:id").put(isAuthenticatedUser, subscribe);
router.route("/unsub/:id").put(isAuthenticatedUser, unsubscribe);
router.route("/like/:id").put(isAuthenticatedUser, like);
router.route("/unlike/:id").put(isAuthenticatedUser, unlike);

export const userRoutes = router;
