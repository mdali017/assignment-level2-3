import { SlotModel } from "./slot.model";

const createASlotIntoDB = async (payload: any) => {
  const result = await SlotModel.create(payload);
  return result;
};

const getAllSlotsFromDB = async () => {
  const result = await SlotModel.find().populate("Services");
  return result;
};

export const SlotService = {
  createASlotIntoDB,
  getAllSlotsFromDB,
};
