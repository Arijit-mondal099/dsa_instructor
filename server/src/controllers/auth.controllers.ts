import { ENV } from "../config/env";
import { AuthModel } from "../models/Auth.model";
import { ApiError } from "../utils/api_error";
import { ApiResponse } from "../utils/api_response";
import { asyncHandler } from "../utils/async_handler";
import { generateAccessAndRefreshToken } from "../utils/generate_token";
import jwt, { JwtPayload } from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body as {
    username: string;
    email: string;
    password: string;
  };

  if (!email?.trim() || !password?.trim() || !username?.trim()) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password length should be getterthan 6 charaters")
  }

  const is_user_exist = await AuthModel.findOne({
    $or: [{ email }, { username }],
  });

  if (is_user_exist) {
    throw new ApiError(409, "User already exists with provided credentials");
  }

  const new_user = await AuthModel.create({
    username,
    email,
    password,
    chatHistory: [],
  });

  const is_new_user_created = await AuthModel.findById(new_user._id).select(
    "-password -refreshToken",
  );

  if (!is_new_user_created) {
    throw new ApiError(400, "Oops faild to create user please try again");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, "User created successfuly", is_new_user_created),
    );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body as {
    username: string;
    email: string;
    password: string;
  };

  if ((!email?.trim() && !username?.trim()) || !password?.trim()) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await AuthModel.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    throw new ApiError(404, "Oops invalid credentials");
  }

  const is_valid_password = await user.comparePassword(password);

  if (!is_valid_password) {
    throw new ApiError(404, "Oops invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const data = {
    _id: user._id,
    email: user.email,
    username: user.username,
    accessToken,
    refreshToken,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, "User loggedin successfuly", data));
});

export const logout = asyncHandler(async (req, res) => {
  const userId = req?.user?.id;

  await AuthModel.findByIdAndUpdate(
    userId,
    { $set: { refreshToken: "" } },
    { new: true },
  );

  return res.status(200).json(new ApiResponse(200, "User logout successfuly"));
});

export const refereshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Access denied: Unauthorized requist!!");
  }

  const decoded = jwt.verify(
    incomingRefreshToken,
    ENV.JWT_REFRESH_TOKEN_SECRET,
  ) as JwtPayload & { id: string };

  const user = await AuthModel.findById(decoded?.id);

  if (!user) {
    throw new ApiError(401, "Access denied: Invalid token or expired!!");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Access denied: Invalid token or expired!!");
  }

  const accessToken = user.generateAccessToken();

  return res.status(200).json(
    new ApiResponse(200, "Access token created successfuly.", {
      accessToken,
    }),
  );
});

export const profile = asyncHandler(async (req, res) => {
  const userId = req?.user?.id;

  const user = await AuthModel.findById(userId).select(
    "-password -refreshToken",
  );

  if (!user) {
    throw new ApiError(404, "Oops user not found please try to login again!");
  }

  return res.status(200).json(new ApiResponse(200, "Loggedin user data", user));
});
