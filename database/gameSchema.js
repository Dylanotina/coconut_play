const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: String,
  author: String,
  bannerPath: String,
  name: String,
  grade: String,
  category: String,
  content: String,
  statut: String,
  createdDate: Date,
});

export default new mongoose.model("Game", gameSchema);
