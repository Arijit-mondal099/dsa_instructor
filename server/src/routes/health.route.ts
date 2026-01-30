import { Router } from "express";
import { asyncHandler } from "../utils/async_handler";
import { ApiResponse } from "../utils/api_response";

const router = Router();

router.route("/").get(
  asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponse(200, "Backend running successfully 🚀"));
  }),
);

export default router;
