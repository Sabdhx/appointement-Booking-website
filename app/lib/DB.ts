import mongoose from "mongoose";
export const DBConnect = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect("mongodb+srv://bookingManagement:123@cluster0.6kxfmze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }
}
