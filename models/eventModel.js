const mongoose = require("mongoose");

const SubEventsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide an Name!"],
    },

    loc: {
      type: { type: String },
      coordinates: [],
    },

    date: {
      type: { type: Date },
    },

    category: { type: String, enum: ["Competition", "Lecture", "Workshop"] },

    description: { type: String },
  },
  { timestamps: true }
);

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide an Name!"],
    },

    loc: {
      type: { type: String },
      coordinates: [],
    },

    pass: {
      type: String,
      required: [true, "Please provide a pass!"],
      unique: false,
    },

    description: { type: String },

    eventUrl: { type: String },

    subEvents: [SubEventsSchema],

    img: {
      data: Buffer,
      contentType: String,
    },

    host: { type: String, required: true },

    organizers: { type: [String] },
  },
  { timestamps: true }
);

module.exports = mongoose.model.Events || mongoose.model("Events", EventSchema);
