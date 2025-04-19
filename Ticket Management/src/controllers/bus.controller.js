import { validationResult } from "express-validator";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Bus from "../models/bus.model.js";


export const createBus = asyncHandler(async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(new ApiError(422, "Validation Failed", errors.array()));
  }

  let {
    busNumber,
    operatorName,
    origin,
    destination,
    schedule,
    totalSeats,
    pricePerSeat,
  } = req.body;


  const existingBus = await Bus.findOne({ busNumber });
  if (existingBus) {
    throw new ApiError(409, "Bus with this number already exists");
  }

  // Validate and normalize schedule
  if (schedule && Array.isArray(schedule)) {
    schedule = schedule.map((entry, index) => {
      const { date, departureTime, availableSeats } = entry;
      if (!date || !departureTime || availableSeats == null) {
        throw new ApiError(400, `Schedule entry ${index + 1} is incomplete`);
      }
      if (availableSeats > totalSeats) {
        throw new ApiError(400, `Schedule entry ${index + 1}: Available seats cannot exceed total seats`);
      }
      return {
        date: new Date(new Date(date).setHours(0, 0, 0, 0)),
        departureTime,
        availableSeats,
      };
    });
  } else {
    throw new ApiError(400, "Schedule must be a non-empty array");
  }
  
  // create bus
  const bus = await Bus.create({
    busNumber: busNumber.trim(),
    operatorName: operatorName.trim(),
    origin: origin.trim(),
    destination: destination.trim(),
    schedule,
    totalSeats,
    pricePerSeat,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, bus, "Bus created successfully"));
});



export const updateBus = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(new ApiError(422, "Validation Failed", errors.array()));
  }

  const { id } = req.params;
  const updates = req.body;

  // If schedule is provided, validate each entry
  if (updates.schedule && Array.isArray(updates.schedule)) {
    updates.schedule = updates.schedule.map((entry, index) => {
      const { date, departureTime, availableSeats } = entry;
      if (!date || !departureTime || availableSeats == null) {
        throw new ApiError(400, `Schedule entry ${index + 1} is incomplete`);
      }
      if (
        updates.totalSeats != null &&
        availableSeats > updates.totalSeats
      ) {
        throw new ApiError(400, `Schedule entry ${index + 1}: Available seats cannot exceed total seats`);
      }
      return {
        date: new Date(new Date(date).setHours(0, 0, 0, 0)),
        departureTime,
        availableSeats,
      };
    });
  }


  const bus = await Bus.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!bus) {
    throw new ApiError(404, "Bus not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, bus, "Bus updated successfully"));
});



export const deleteBus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const bus = await Bus.findByIdAndDelete(id);

  if (!bus) {
    throw new ApiError(404, "Bus not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, bus, "Bus deleted successfully"));
});



export const getAllBuses = asyncHandler(async (req, res) => {
  const buses = await Bus.find();
  return res.status(200).json(new ApiResponse(200, buses, "All buses fetched"));
});



export const getBusById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const bus = await Bus.findById(id);
  if (!bus) {
    throw new ApiError(404, "Bus not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, bus, "Bus fetched successfully"));
});
