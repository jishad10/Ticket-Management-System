import { Router } from "express";
import {
  createTicket,
  updateTicket,
  deleteTicket,
  getAvailableTickets,
  purchaseTicket
} from "../controllers/ticket.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import {
  createTicketValidator,
  updateTicketValidator
} from "../validators/ticket.validators.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";


const router = Router();


// Admin routes only
router.route("/admin/ticket")
  .post(verifyJWT, isAdmin, createTicketValidator(), createTicket);

router.route("/admin/ticket/:id")
  .put(
    verifyJWT,
    isAdmin,
    mongoIdPathVariableValidator("id"),
    updateTicketValidator(),
    updateTicket
  )
  .delete(
    verifyJWT,
    isAdmin,
    mongoIdPathVariableValidator("id"),
    deleteTicket
  );


// User routes
router.route("/tickets").get(getAvailableTickets);
router.route("/tickets/purchase").post(verifyJWT, purchaseTicket);

export default router;

