import mongoose, { Schema } from 'mongoose';

const ScoreSchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  categories: { type: Array, required: true }
});

export const Score = mongoose.model('Score', ScoreSchema);
