import mongoose from "mongoose";

const journalSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    ambience: { type: String, required: true },
    text: { type: String, required: true },
    emotion: { type: String, required: true },
    keywords: { type: [String], required: true },
    summary: { type: String, required: true },
  },
  { timestamps: true },
);

export const Journal =
  mongoose.models.Journal || mongoose.model("Journal", journalSchema);
