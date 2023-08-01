const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  packageId: { type: mongoose.Schema.ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  date: { type: Date, required: true },
  numOfDays: { type: Number },
  price: { type: Number },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
