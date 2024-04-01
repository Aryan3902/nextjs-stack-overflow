"use server";

import Tag from "@/database/tag.model";
import Question from "@/database/question.model";

import { connectToDatabase } from "../mongoose";

export async function createQuestion(data: any) {
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
  } catch (error) {
    console.error(error);
  }
}
