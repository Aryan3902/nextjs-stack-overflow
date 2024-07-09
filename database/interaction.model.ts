import { Schema, model, models, Document } from "mongoose";

// Define the interface for the Interaction model
export interface IInteraction extends Document {
  user: Schema.Types.ObjectId; // reference to the user
  action: string; // the action performed by the user
  question: Schema.Types.ObjectId; // reference to the question
  answer: Schema.Types.ObjectId; // reference to the answer
  tags: Schema.Types.ObjectId[]; // reference to the tags
  createdOn: Date;
}

// Define the Interaction schema
const InteractionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  createdOn: { type: Date, default: Date.now },
});

// Assign the Interaction model to the Interaction variable and incase if it doesn't exist, create a new model
const Interaction =
  models.Interaction || model<IInteraction>("Interaction", InteractionSchema);

// Export the Interaction model
export default Interaction;
