import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotService } from "./slot.service";

// Utility function to convert "HH:MM" time format to minutes
const timeToMinutes = (time: any) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Utility function to convert minutes to "HH:MM" time format
const minutesToTime = (minutes: any) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

const createSlot = catchAsync(async (req, res) => {
  const {
    serviceId,
    date,
    startTime,
    endTime,
    serviceDuration = 60,
  } = req.body;

  if (!serviceId) {
    res.status(400).json({
      success: false,
      message: "Service ID is required",
    });
    return;
  }

  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const totalDuration = endMinutes - startMinutes;
  const numberOfSlots = totalDuration / serviceDuration;

  const slots = [];

  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartMinutes = startMinutes + i * serviceDuration;
    const slotEndMinutes = slotStartMinutes + serviceDuration;

    const slotStartTime = minutesToTime(slotStartMinutes);
    const slotEndTime = minutesToTime(slotEndMinutes);

    const slot = await SlotService.createASlotIntoDB({
      service: serviceId,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
    });

    slots.push(slot);
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Slots created successfully",
    data: slots,
  });

  return undefined; // Explicitly return undefined to satisfy the void return type
});

const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotService.getAllSlotsFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All slots fetched successfully",
    data: result,
  });
});

const getAvailableSlots = catchAsync(async (req: Request, res: Response) => {
  const { date, serviceId } = req.query;
  
  const availableSlots = await SlotService.getAvailableSlots(date, serviceId);
  // console.log(availableSlots)

  // res.status(200).json({
  //   success: true,
  //   message: "Available slots fetched successfully",
  //   data: availableSlots,
  // });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Available slots fetched successfully",
    data: availableSlots,
  });
});

const updateSlot = catchAsync(async (req, res) => {
  // console.log(req.params.id, req.body)
  const result = await SlotService.updateASlotFromDB(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Slot updated successfully",
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAvailableSlots,
  getAllSlots,
  updateSlot,
};
