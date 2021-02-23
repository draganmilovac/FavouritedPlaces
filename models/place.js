const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  location: {
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  address: { type: String, required: false },
  creator: { type: mongoose.Types.ObjectId, required: false, ref: "User" },
});

module.exports = mongoose.model("Place", placeSchema);
