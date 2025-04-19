import { Router } from "express";
import {
  createBus,
  updateBus,
  deleteBus,
  getAllBuses,
  getBusById,
} from "../controllers/bus.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import {
  createBusValidator,
  updateBusValidator,
  mongoIdPathVariableValidator,
} from "../validators/bus.validators.js";


const router = Router();


// Admin-only routes
router.route("/admin/bus").post(
  verifyJWT,
  isAdmin,
  createBusValidator(),
  createBus
);

router.route("/admin/bus/:id").put(
  verifyJWT,
  isAdmin,
  mongoIdPathVariableValidator("id"),
  updateBusValidator(),
  updateBus
);

router.route("/admin/bus/:id").delete(
  verifyJWT,
  isAdmin,
  mongoIdPathVariableValidator("id"),
  deleteBus
);


// User routes
router.route("/buses").get(getAllBuses);
router.route("/bus/:id").get(mongoIdPathVariableValidator("id"), getBusById);

export default router;
