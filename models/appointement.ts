import mongoose, { model, models, Schema } from "mongoose"
const appointment = new Schema({
  
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require:true
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require:true
    },
    postId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Post",
      require:true
    },
    name:{
      type:String,
      require:true
    },
    email:{
      type:String,
      require:true
    },
    description:{
      type:String,
      require:true
    },
    date: {
      type: String,
      require:true
    },
    time: {
      type: String,
      require:true
    },
    status: {
      type: String,
      enum: ["booked", "cancelled", "completed"],
      default: "booked",
    },
  },
  { timestamps: true }

)


const Appointment = models.appointment || model("appointment", appointment);
export default Appointment;