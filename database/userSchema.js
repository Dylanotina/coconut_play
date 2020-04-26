const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: String,
  birthdate: Date,
  firstname: String,
  lastname: String,
  statut: String,
});

export default new mongoose.model("User", userSchema);
