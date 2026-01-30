import { ENV } from "../config/env";
import { AuthModel } from "../models/Auth.model";
import { ApiError } from "../utils/api_error";
import { asyncHandler } from "../utils/async_handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../types/index";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const authVerify = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized request!!");
  }

  const decodedToken = jwt.verify(
    token,
    ENV.JWT_ACCESS_TOKEN_SECRET,
  ) as JwtPayload & { id: string; username: string; email: string };

  const user = await AuthModel.findById(decodedToken?.id).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(401, "Invalid access token!!");
  }

  req.user = { id: user._id, email: user.email, username: user.username };
  return next();
});
