import { Types } from "mongoose";
import { TabModel } from "../models/Tab.model";
import { ApiError } from "../utils/api_error";
import { asyncHandler } from "../utils/async_handler";
import { ApiResponse } from "../utils/api_response";
import { LLM } from "../config/gemini";

export const createNewMessageTab = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const newTab = await TabModel.create({
    title: "New Tab",
    userId: new Types.ObjectId(userId),
    content: [],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Tab created successfully", { tab: newTab }));
});

export const getUserTabs = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized");
  }

  const tabs = await TabModel.find({ userId: new Types.ObjectId(userId) }).sort(
    { createdAt: -1 },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Tabs fetched successfully", { tabs }));
});

export const getUserTabById = asyncHandler(async (req, res) => {
  const { slug } = req.params as { slug: string };
  const userId = req.user.id;

  const tab = await TabModel.findOne({ $and: [{ _id: slug, userId }] });

  if (!tab) {
    throw new ApiError(404, "Message tab not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User message tab found successfuly", tab));
});

export const sentMessage = asyncHandler(async (req, res) => {
  const { slug } = req.params as { slug: string };
  const { prompt } = req.body as { prompt: string };
  const userId = req.user.id;

  const tab = await TabModel.findOne({ $and: [{ _id: slug, userId }] });

  if (!tab) {
    throw new ApiError(404, "Message tab not found");
  }

  if (!prompt?.trim()) {
    throw new ApiError(400, "Please provide an prompt");
  }

  // add user content to the tab
  tab.content.push({ role: "user", text: prompt });

  // LLM response according to the user prompt
  const response = await LLM.sendMessage({ message: prompt });

  // add LLM response to the tab
  tab.content.push({ role: "model", text: response.text! });

  await tab.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "success", { role: "model", text: response.text! }),
    );
});
