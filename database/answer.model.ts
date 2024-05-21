import { Schema, model, models, Document } from "mongoose";

// Define the interface for the Answer model
export interface IAnswer extends Document {
  content: string;
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  createdAt: Date;
}

// Define the Answer schema
const AnswerSchema = new Schema({
  content: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// Assign the Answer model to the Answer variable and incase if it doesn't exist, create a new model
const Answer = models.Answer || model<IAnswer>("Answer", AnswerSchema);

// Export the Answer model
export default Answer;
