import { SlotModel } from "./slot.model";

const createASlotIntoDB = async (payload: any) => {
  const slot = await SlotModel.create(payload);
  return {
    ...slot.toObject(),
    isBooked: false, 
  };
};

const getAllSlotsFromDB = async () => {
  const slots = await SlotModel.find().populate("service");
  return slots.map((slot) => ({
    ...slot.toObject(),
    isBooked: slot.isBooked ? "booked" : "available", // Transform isBooked
  }));
};

const getAvailableSlots = async (date?: any, serviceId?: any) => {
  const query: any = { isBooked: false };

  if (date) query.date = date;
  if (serviceId) query.service = serviceId;

  const availableSlots = await SlotModel.find(query).populate("service");
  return availableSlots;
};

const updateASlotFromDB = async (id: any, payload: any) => {
  console.log(payload);
  const result = await SlotModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const SlotService = {
  createASlotIntoDB,
  getAllSlotsFromDB,
  getAvailableSlots,
  updateASlotFromDB,
};
