import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ServicesService } from "./services.service";
import { SingleFileUpload } from "../../helpers/singleFileUpload";

const createServices = catchAsync(async (req, res, next) => {
  const data = JSON.parse(req.body.data); // Parsing stringified JSON from the form
  const file = req.file;

  if (file) {
    const imageUrl = await SingleFileUpload.uploadFileToCloudinary(file.path);
    data.image = imageUrl; // Add the uploaded image URL to the payload
  }

  const result = await ServicesService.createAServicesIntoDB(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service created successfully",
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
  // console.log("click");
  const data = JSON.parse(req.body.data);
  const file = req.file;

  // console.log(data);
  // console.log(file);

  if (file) {
    const imageUrl = await SingleFileUpload.uploadFileToCloudinary(file.path);
    data.image = imageUrl;
  }

  const result = await ServicesService.updateAServicesIntoDB(
    req.params.id,
    data
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service updated successfully",
    data: result,
  });
});

const deleteServices = catchAsync(async (req, res, next) => {
  const result = await ServicesService.deleteAServicesFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service deleted successfully",
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
