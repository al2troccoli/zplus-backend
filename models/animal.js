const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
    lastVisit: {
      type: Date,
      required: false,
    },
    lastUpdate: {
      type: Date,
      required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Animal', animalSchema);
