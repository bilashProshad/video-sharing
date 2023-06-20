import express from "express";
import {
  getUser,
  like,
  login,
  logout,
  register,
  subscribe,
  unlike,
  unsubscribe,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/find/:id").get(getUser);
router.route("/sub/:id").put(isAuthenticatedUser, subscribe);
router.route("/unsub/:id").put(isAuthenticatedUser, unsubscribe);
router.route("/like/:id").put(isAuthenticatedUser, like);
router.route("/unlike/:id").put(isAuthenticatedUser, unlike);

export const userRoutes = router;
