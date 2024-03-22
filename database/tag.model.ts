import { Schema, model, models, Document } from "mongoose";

// Define the interface for the Tag model
export interface ITag extends Document {
  name: string;
  description: string;
  questions: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn?: Date;
}

// Define the Tag schema
const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

// Assign the Tag model to the Tag variable and incase if it doesn't exist, create a new model
const Tag = models.Tag || model<ITag>("Tag", TagSchema);

// Export the Tag model
export default Tag;
