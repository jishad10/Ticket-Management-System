import { body } from "express-validator";
import { mongoIdPathVariableValidator } from "./common/mongodb.validators.js";

const createBusValidator = () => {
  return [
    body("busNumber").trim().notEmpty().withMessage("Bus number is required"),
    body("operatorName").trim().notEmpty().withMessage("Operator name is required"),
    body("origin").trim().notEmpty().withMessage("Origin is required"),
    body("destination").trim().notEmpty().withMessage("Destination is required"),
    body("totalSeats").notEmpty().isNumeric().withMessage("Total seats must be a number"),
    body("pricePerSeat").notEmpty().isNumeric().withMessage("Price per seat must be a number"),

    body("schedule").isArray({ min: 1 }).withMessage("Schedule must be a non-empty array"),
    body("schedule.*.date").notEmpty().withMessage("Schedule date is required").isISO8601().toDate(),
    body("schedule.*.departureTime").trim().notEmpty().withMessage("Departure time is required"),
    body("schedule.*.availableSeats").notEmpty().isNumeric().withMessage("Available seats must be a number"),
  ];
};

const updateBusValidator = () => {
  return [
    body("busNumber").optional().trim().notEmpty(),
    body("operatorName").optional().trim().notEmpty(),
    body("origin").optional().trim().notEmpty(),
    body("destination").optional().trim().notEmpty(),
    body("totalSeats").optional().isNumeric().withMessage("Total seats must be a number"),
    body("pricePerSeat").optional().isNumeric().withMessage("Price per seat must be a number"),

    body("schedule").optional().isArray(),
    body("schedule.*.date").optional().isISO8601().toDate(),
    body("schedule.*.departureTime").optional().trim().notEmpty(),
    body("schedule.*.availableSeats").optional().isNumeric().withMessage("Available seats must be a number"),
  ];
};

export {
  createBusValidator,
  updateBusValidator,
  mongoIdPathVariableValidator 
};
