import mongoose, { Schema } from "mongoose";

const scheduleSchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    departureTime: {
      type: String,
      required: true,
      trim: true
    },
    availableSeats: {
      type: Number,
      required: true
    }
  },
  { _id: false } 
);

const busSchema = new Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    operatorName: {
      type: String,
      required: true,
      trim: true
    },
    origin: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    schedule: {
      type: [scheduleSchema],
      default: []
    },
    totalSeats: {
      type: Number,
      required: true
    },
    pricePerSeat: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Bus = mongoose.model("Bus", busSchema);
export default Bus;
