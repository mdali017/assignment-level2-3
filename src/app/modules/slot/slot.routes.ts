import express from "express";
import { slotController } from "./slot.controller";
import { authenticateAdmin } from "../../middleware/auth";
// import { authenticateAdmin } from "../../middleware/authenticateAdmin";
// import { authenticateUser } from "../../middleware/authenticateUser";
const router = express.Router();

// router.post("/", slotController.createSlot); // todo
// /api/slots/availability
router.post("/services/slots", authenticateAdmin, slotController.createSlot);
router.get("/slots/availability", slotController.getAvailableSlotsController);
// router.get("/availability", slotController.getAvailableSlots);

export const SlotRoute = router;
