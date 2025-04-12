import {model, models, Schema} from "mongoose";

const user= new Schema({
  role:{
    type:String,
    enum:["normalUser","provider"]
  },
   username:{
    type:String,
    require:true,
  },
  email:{
    type:String,
    require:true,
    unique:[true,"Already exists"]
  },
  image:{
    type:String,
  }
})

const User = models.User || model("User",user);
export default User; 