import express from "express";
import { slotController } from "./slot.controller";
const router = express.Router();

// router.post("/", slotController.createSlot); // todo
router.post("/", slotController.createSlot);
router.get("/", slotController.getAllSlot);

export const SlotRoute = router;
