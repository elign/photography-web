const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  packageId: { type: mongoose.Schema.ObjectId, required: true },
  user: {type: mongoose.Schema.Types.ObjectId, required: true},
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  price: { type: Number },
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
