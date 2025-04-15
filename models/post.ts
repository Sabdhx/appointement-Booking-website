import mongoose, { model, models, Types } from "mongoose";
import { title } from "process";

const postSchema = new mongoose.Schema({
  providerId:{
    type:Number,
    require:true
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  businessType: {
    type: String,
    require: true,
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
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  paymentStatus:{
    type:String,
    require:true,
    default:"unpaid",
    enum:["paid","unpaid"]
  },
  address:{
    type:String,
    require:true
  },
  location: {
    address: {
      type: String,
      required: true, // You can make this required or not depending on your needs
    },
    latitude: {
      type: Number,
      required: true, // Required if the location is crucial
    },
    longitude: {
      type: Number,
      required: true, // Required if the location is crucial
    },
  },
  status:{
    type:String,
    default:"pending",
    enum:["Pending", "Completed", "Canceled"],
    require:true,
  },
  serviceTypt:{
    type:String,
    default:"In-person",
    enum:["Online", "Phone call","In-person"]
  },
  customerFeedback: {
    rating:{
      type:Number,
      enum:["Great service!","Normal Service","Poor Service"]
    }
  },
  images:{
    type:Array,
    require:true
  }
});


const Post = models.postSchema || model("Post",postSchema)
export default Post