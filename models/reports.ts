import mongoose, { model, models, Types } from "mongoose";

const ReportSchema = new mongoose.Schema({
  reporterId: {
    type: String,
    required: true,
  },
  reportedUserId: {
    type: String,
    required: true,
  },
  reporttype: {
    type: String,
    required: true,
    enum: ["appointment", "profile"],
  },
  
  reason: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // ✅ Correct
  },
});

const Report = models.Report || model("Report", ReportSchema);
export default Report;
