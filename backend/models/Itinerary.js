const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  budget: {
    type: String,
    enum: ['budget', 'moderate', 'luxury'],
    required: true
  },
  interests: [{
    type: String
  }],
  groupSize: {
    type: String,
    enum: ['solo', 'couple', 'family', 'group'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  itinerary: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
