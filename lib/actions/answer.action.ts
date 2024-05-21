"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";

import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    // Get all answers for a question
    const answers = await Answer.find({ question: questionId }).populate(
      "author",
      "_id name picture clerkId"
    );

    return { answers };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createAnswer(data: CreateAnswerParams) {
  try {
    connectToDatabase();
    const { content, question, author, path } = data;

    // Create a new answer
    const answer = new Answer({
      content,
      question,
      author,
    });

    // Add the aswer to the question's answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    await answer.save();

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
