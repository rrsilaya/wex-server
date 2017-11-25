import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  type: { type: String, required: true },
  difficulty: { type: String, required: true },
  category: { type: String, required: true },
  choices: { type: Array },
  answer: { type: String, required: true }
});

export const Question = mongoose.model('Question', QuestionSchema);
