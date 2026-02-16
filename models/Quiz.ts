import { Schema, models, model } from "mongoose";

const QuestionSchema = new Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String, String], required: true },
});

const QuizSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  questions: { type: [QuestionSchema], required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: String, required: true },
  public: { type: Boolean, required: true },
});

export const Quiz = models.Quiz || model("Quiz", QuizSchema);
