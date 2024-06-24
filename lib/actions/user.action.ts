"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { FilterQuery } from "mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import Tag from "@/database/tag.model";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createUser(userData: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Delete everything related to the user
    // Questions
    // eslint-disable-next-line no-unused-vars
    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id"
    );

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    // eslint-disable-next-line no-unused-vars
    const { page = 1, pageSize = 20, searchQuery = "", filter = "" } = params;

    const users = await User.find({
      name: { $regex: new RegExp(searchQuery, "i") },
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    return { users };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId, path } = params;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isQuestionSaved = user.savedQuestions.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { savedQuestions: questionId } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $push: { savedQuestions: questionId } },
        { new: true }
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionParams) {
  try {
    connectToDatabase();

    const {
      clerkId,
      searchQuery = "",
      // filter = "",
      page = 1,
      pageSize = 20,
    } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "savedQuestions",
      match: query,
      options: {
        limit: pageSize,
        skip: (page - 1) * pageSize,
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "author", model: User, select: "_id name picture clerkId" },
        { path: "tags", model: Tag, select: "_id name" },
      ],
    });
    if (!user) {
      throw new Error("User not found");
    }
    const savedQuestions = user.savedQuestions;
    return { questions: savedQuestions };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
