import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  gameId: String,
  username: String,
  email: String,
  text: String,
  createdDate: Date,
});

export default new mongoose.model("comments", commentSchema);
