import { Router } from "express";
import {
  login,
  register,
  logout,
  profile,
  refereshAccessToken,
} from "../controllers/auth.controllers";
import { authVerify } from "../middlewares/auth.middleware";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(authVerify, logout);
router.route("/profile").get(authVerify, profile);
router.route("/generate-access-token").get(refereshAccessToken);

export default router;
