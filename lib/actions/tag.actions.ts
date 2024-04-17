import User from "@/database/user.model";
import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";

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

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { page = 1, pageSize = 10, filter = "", searchQuery = "" } = params;

    // Get all tags
    const tags = await Tag.find({})
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    return { tags };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
