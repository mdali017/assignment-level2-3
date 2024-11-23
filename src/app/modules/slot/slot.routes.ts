import express from "express";
// import { slotController } from "./slot.controller";
import { authenticateAdmin } from "../../middleware/auth";
import { SlotController } from "./slot.controller";
// import { authenticateAdmin } from "../../middleware/authenticateAdmin";
// import { authenticateUser } from "../../middleware/authenticateUser";
const router = express.Router();

// router.post("/", slotController.createSlot); // todo
// /api/slots/availability
router.post("/services/slots", authenticateAdmin, SlotController.createSlot);
router.get("/slots/availability", SlotController.getAvailableSlots);
router.get("/all-slots", SlotController.getAllSlots);
router.patch("/all-slots/:id",  SlotController.updateSlot);
// router.get("/availability", slotController.getAvailableSlots);

export const SlotRoute = router;
