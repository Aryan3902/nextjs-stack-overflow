"use server";

import Tag from "@/database/tag.model";
import Question from "@/database/question.model";

import { connectToDatabase } from "../mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const { page = 1, pageSize = 10, searchQuery = "", filter = "" } = params;

    // Get all questions
    const questions = await Question.find({
      // Search by title and description
      $or: [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ],
    })
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return { questions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createQuestion(data: CreateQuestionParams) {
  try {
    connectToDatabase();
    const { title, description, tags, author, path } = data;

    // Create a new question
    const question = await Question.create({
      title,
      description,
      author,
    });

    const tagDocs = [];

    // Create tags if they don't exist and add the question to the tags
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        // Match the tag name
        { name: { $regex: new RegExp(`^${tag}$^`, "i") } },
        // Create a new tag if it doesn't exist and add the question to the tag
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocs.push(existingTag._id);
    }

    // Add the tags to the question
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocs } },
    });

    // As we are creating the question, we need to refresh the Home page where the question is being
    // created in order to see the newly created question.
    revalidatePath(path);
  } catch (error) {
    console.error(error);
  }
}
