"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";

import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    // Get all answers for a question
    const answers = await Answer.find({ question: questionId }).populate(
      "author",
      "_id name picture clerkId",
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
    const { description, question, author, path } = data;

    // Create a new answer
    const answer = new Answer({
      description,
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

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectToDatabase();

    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found");
    }

    await Answer.deleteOne({ _id: answerId });

    await Question.updateMany(
      { question: answerId },
      { $pull: { answers: answerId } },
    );

    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;
    console.log(userId);
    let updateQuery = {};

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasdownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $addToSet: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const question = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectToDatabase();
    const { answerId, userId, hasupVoted, hasdownVoted, path } = params;

    let updateQuery = {};

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasupVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $addToSet: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const question = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });

    if (!question) {
      throw new Error("Answer not found");
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
