import { Router } from "express";
import { authVerify } from "../middlewares/auth.middleware";
import { createNewMessageTab, getUserTabById, getUserTabs, sentMessage } from "../controllers/message.controllers";

const router = Router();

router.route("/").get(authVerify, getUserTabs).post(authVerify, createNewMessageTab);
router.route("/:slug").get(authVerify, getUserTabById).patch(authVerify, sentMessage);

export default router;
