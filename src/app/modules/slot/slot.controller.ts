import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotService } from "./slot.service";

const createSlot = catchAsync(async (req, res, next) => {
  const result = await SlotService.createASlotIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Slot created successfully",
    data: result,
  });
});

const getAllSlot = catchAsync(async (req, res, next) => {
  const result = await SlotService.getAllSlotsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All slots fetched successfully",
    data: result,
  });
});

export const slotController = {
  createSlot,
  getAllSlot,
};
