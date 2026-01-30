import { AuthModel } from "../models/Auth.model";

export const generateAccessAndRefreshToken = async (
  userId: unknown,
): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const user = await AuthModel.findById(userId);

    if (!user) {
        throw new Error("User not found while generating jwt token")
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // save refresh token on db
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("JWT token creation error");
  }
};
