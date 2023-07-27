const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkOut: String,
  price: Number,
});

const PackageModel = mongoose.model("Package", packageSchema);

module.exports = PackageModel;
