import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServicesService } from "./services.service";

const createServices = catchAsync(async (req, res, next) => {
  const result = await ServicesService.createAServicesIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Services created successfully",
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res, next) => {
  const result = await ServicesService.getAllServicesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All services fetched successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res, next) => {
  const result = await ServicesService.getSingleServiceFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Single service fetched successfully",
    data: result,
  });
});

const updateServices = catchAsync(async (req, res, next) => {
  const result = await ServicesService.updateAServicesIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Services updated successfully",
    data: result,
  });
});

const deleteServices = catchAsync(async (req, res, next) => {
  const result = await ServicesService.deleteAServicesFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Services deleted successfully",
    data: result,
  });
});

export const ServicesController = {
  createServices,
  getAllServices,
  getSingleService,
  updateServices,
  deleteServices,
};
