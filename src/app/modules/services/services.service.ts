import { ServicesModel } from "./services.model";
import { TServices } from "./services.interface";

const createAServicesIntoDB = async (payload: Partial<TServices>) => {
  const result = await ServicesModel.create(payload);
  return result;
};

const getAllServicesFromDB = async () => {
  const result = await ServicesModel.find();
  return result;
};

const getSingleServiceFromDB = async (id: string) => {
  const result = await ServicesModel.findById(id);
  return result;
};

const updateAServicesIntoDB = async (id: string, payload: Partial<TServices>) => {
  const result = await ServicesModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteAServicesFromDB = async (id: string) => {
  const result = await ServicesModel.findByIdAndDelete(id);
  return result;
};

export const ServicesService = {
  createAServicesIntoDB,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateAServicesIntoDB,
  deleteAServicesFromDB,
};
