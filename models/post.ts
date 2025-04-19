import mongoose, { model, models, Types } from "mongoose";

const postSchema = new mongoose.Schema({
  providerId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,  // Corrected from 'require' to 'required'
  },
  description: {
    type: String,
    required: true,  // Corrected from 'require' to 'required'
  },
  businessType: {
    type: String,
    required: true,  // Corrected from 'require' to 'required'
  },
  customer: [
    {
      type: Types.ObjectId, // Reference to the User model
      ref: "User", // This is the name of your User model
    },
  ],
  bookingData: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: String,
    required: true,  // Corrected from 'require' to 'required'
  },
  price: {
    type: String,
    required: true,  // Corrected from 'require' to 'required'
  },
  paymentStatus: {
    type: String,
    required: true,
    default: "unpaid",
    enum: ["paid", "unpaid"],
  },
  address: {
    type: String,
    required: true,  // Corrected from 'require' to 'required'
  },
  location: {
    address: {
      type: String,
      required: true, // Can be optional based on your needs
    },
    latitude: {
      type: Number,  // Changed from String to Number
      required: true, // Required if location is crucial
    },
    longitude: {
      type: Number,  // Changed from String to Number
      required: true, // Required if location is crucial
    },
  },
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Completed", "Canceled"],
    required: true,  // Corrected from 'require' to 'required'
  },
  serviceType: {  // Fixed typo from 'serviceTypt' to 'serviceType'
    type: String,
    default: "In-person",
    enum: ["Online", "Phone call", "In-person"],
  },
  customerFeedback: {
    rating: {
      type: String,
      enum: ["Great service!", "Normal Service", "Poor Service"],
      required: false,  // Optional if no feedback is provided
    },
  },
  images: {
    type: [String],  // Specify that images should be an array of strings
    required: true,  // Corrected from 'require' to 'required'
  },
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
