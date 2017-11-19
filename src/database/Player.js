import mongoose, { Schema } from 'mongoose';

const PlayerSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  categories: { type: Array, required: true },
  qIndex: { type: Number, required: true },
  questions: { type: Array, required: true },
  isFinished: { type: Boolean, required: true }
});

export const Player = mongoose.model('Player', PlayerSchema);
