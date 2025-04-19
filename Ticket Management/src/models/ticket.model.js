import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true
    },
    scheduleDate: {
      type: Date,
      required: true
    },
    departureTime: {
      type: String,
      required: true,
      trim: true
    },
    seatNumber: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked"
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    },
    transactionId: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
