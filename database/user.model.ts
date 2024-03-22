import { Schema, model, models, Document } from "mongoose";

// Define the interface for the User model
export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  savedQuestions?: Schema.Types.ObjectId[];
  questions: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  upvoted: Schema.Types.ObjectId[];
  joinedAt: Date;
}

// Define the User schema
const UserSchema = new Schema({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number, default: 0 },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  savedQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  upvoted: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

// Assign the User model to the User variable and incase if it doesn't exist, create a new model
const User = models.User || model<IUser>("User", UserSchema);

// Export the User model
export default User;
