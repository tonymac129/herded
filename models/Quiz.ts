import { Schema, models, model } from "mongoose";

const CommentSchema = new Schema({
  id: { type: String, required: true },
  user: { type: String, required: true },
  trait: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: String, required: true },
});

const OptionSchema = new Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const QuestionSchema = new Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [OptionSchema, OptionSchema], required: true },
});

const QuizSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  questions: { type: [QuestionSchema], required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: String, required: true },
  public: { type: Boolean, required: true },
  comments: { type: [CommentSchema], default: [] },
  plays: { type: Number, default: 0 },
});

export const Quiz = models.Quiz || model("Quiz", QuizSchema);
