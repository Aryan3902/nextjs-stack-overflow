import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId, limit = 3 } = params;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    // Get the top interacted tags

    return [
      { name: "React", _id: "1" },
      { name: "Next.js", _id: "2" },
      { name: "Node.js", _id: "3" },
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
