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
    enum: ["post", "profile"],
  },
  
  reason: {
    type: String,
    required: true,
  },
  postId: {
  type: Types.ObjectId,
  ref: "Post",
},
    appointmentId: {
    type: String,
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
