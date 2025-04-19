import { body } from "express-validator";
import { mongoIdRequestBodyValidator } from "./common/mongodb.validators.js";

export const createTicketValidator = () => {
  return [
    ...mongoIdRequestBodyValidator("user"),
    ...mongoIdRequestBodyValidator("bus"),
    body("scheduleDate").notEmpty().isISO8601().toDate().withMessage("Valid scheduleDate is required"),
    body("departureTime").notEmpty().trim().withMessage("departureTime is required"),
    body("seatNumber").notEmpty().isInt({ min: 1 }).withMessage("seatNumber must be a positive integer"),
    body("price").notEmpty().isNumeric().withMessage("price must be a number"),
    body("status").optional().isIn(["booked", "cancelled"]).withMessage("Invalid status"),
    body("paymentStatus").optional().isIn(["pending", "completed"]).withMessage("Invalid paymentStatus"),
    body("transactionId").optional().trim(),
  ];
};

export const updateTicketValidator = () => {
  return [
    body("status").optional().isIn(["booked", "cancelled"]).withMessage("Invalid status"),
    body("paymentStatus").optional().isIn(["pending", "completed"]).withMessage("Invalid paymentStatus"),
    body("transactionId").optional().trim(),
  ];
};
