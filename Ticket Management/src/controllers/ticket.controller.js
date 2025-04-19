import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Ticket from "../models/ticket.model.js";
import Bus from "../models/bus.model.js";


export const createTicket = asyncHandler(async (req, res) => {
  const {
    user,
    bus,
    scheduleDate,
    departureTime,
    seatNumber,
    price
  } = req.body;

  const busData = await Bus.findById(bus);
  if (!busData) {
    throw new ApiError(404, "Bus not found");
  }

  if (seatNumber < 1 || seatNumber > busData.totalSeats) {
    throw new ApiError(
      400,
      `Seat number must be between 1 and ${busData.totalSeats}`
    );
  }

  // Duplicate seat check
  const isSeatTaken = await Ticket.findOne({
    bus,
    scheduleDate: new Date(new Date(scheduleDate).setHours(0, 0, 0, 0)),
    departureTime,
    seatNumber
  });

  if (isSeatTaken) {
    throw new ApiError(409, "Seat already booked for this schedule");
  }


  const ticket = await Ticket.create({
    user,
    bus,
    scheduleDate: new Date(new Date(scheduleDate).setHours(0, 0, 0, 0)),
    departureTime,
    seatNumber,
    price,
    status: "booked"
  });

  return res
    .status(201)
    .json(new ApiResponse(201, ticket, "Ticket created successfully"));
});



export const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }

  // Check if seat info is being changed
  const { seatNumber, bus, scheduleDate, departureTime } = updates;

  if (seatNumber || bus || scheduleDate || departureTime) {
    const updatedBus = bus || ticket.bus;
    const updatedDate = scheduleDate || ticket.scheduleDate;
    const updatedTime = departureTime || ticket.departureTime;
    const updatedSeat = seatNumber || ticket.seatNumber;

    const duplicate = await Ticket.findOne({
      _id: { $ne: id },
      bus: updatedBus,
      scheduleDate: updatedDate,
      departureTime: updatedTime,
      seatNumber: updatedSeat
    });

    if (duplicate) {
      throw new ApiError(409, "Seat already booked for this schedule");
    }

    const busDoc = await Bus.findById(updatedBus);
    if (updatedSeat < 1 || updatedSeat > busDoc.totalSeats) {
      throw new ApiError(400, `Seat number must be between 1 and ${busDoc.totalSeats}`);
    }
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTicket, "Ticket updated successfully"));
});



export const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const ticket = await Ticket.findById(id);
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }

  await ticket.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, ticket, "Ticket deleted successfully"));
});



export const getAvailableTickets = asyncHandler(async (req, res) => {
  const { busId, date } = req.query;

  const query = {
    status: "booked"
  };

  if (busId) query.bus = busId;

  if (date) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new ApiError(400, "Invalid date format");
    }
    query.scheduleDate = parsedDate;
  }

  const tickets = await Ticket.find(query)
    .populate("bus")
    .populate("user");

  return res
    .status(200)
    .json(new ApiResponse(200, tickets, "Available tickets fetched"));
});



export const purchaseTicket = asyncHandler(async (req, res) => {
  const { ticketId, busId, transactionId } = req.body;

  if (!ticketId || !busId || !transactionId) {
    throw new ApiError(400, "ticketId, busId, and transactionId are required");
  }

  const bus = await Bus.findById(busId);
  if (!bus) {
    throw new ApiError(404, "Bus not found");
  }

  const ticket = await Ticket.findById(ticketId);
  if (!ticket) {
    throw new ApiError(404, "Ticket not found");
  }

  if (ticket.bus.toString() !== busId) {
    throw new ApiError(400, "Ticket does not belong to this bus");
  }

  if (ticket.paymentStatus === "completed") {
    throw new ApiError(409, "This ticket is already purchased");
  }

  // Update payment info
  ticket.paymentStatus = "completed";
  ticket.transactionId = transactionId;
  await ticket.save();

  return res.status(200).json(
    new ApiResponse(200, ticket, "Ticket purchased successfully")
  );
});

