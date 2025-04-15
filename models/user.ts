import { model, models, Schema, Types } from "mongoose";

const user = new Schema({
  role: {
    type: String,
    enum: ["normalUser", "provider"],
  },
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: [true, "Already exists"],
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  

});

const User = models.User || model("User", user);
export default User;
