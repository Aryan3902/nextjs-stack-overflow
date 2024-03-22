import { Schema, model, models, Document } from "mongoose";

// Define the interface for the Question model
export interface IQuestion extends Document {
  title: string;
  description: string;
  tags: Schema.Types.ObjectId[];
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  views: number;
  author: Schema.Types.ObjectId;
  answers: Schema.Types.ObjectId[];
  createdAt: Date;
}

// Define the Question schema
const QuestionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  views: { type: Number, default: 0 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  createdAt: { type: Date, default: Date.now },
});

// Assign the Question model to the Question variable and incase if it doesn't exist, create a new model
const Question =
  models.Question || model<IQuestion>("Question", QuestionSchema);

// Export the Question model
export default Question;
