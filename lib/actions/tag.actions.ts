/* eslint-disable no-unused-vars */
import User from "@/database/user.model";
import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";

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

export async function getQuestionsByTagId(params: GetQuestionByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery = "" } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    // Get all questions by tag
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkld name picture" },
      ],
    });

    if (!tag) throw new Error("Tag not found");

    const questions = tag.questions;
    return { questions, tagTitle: tag.name };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
