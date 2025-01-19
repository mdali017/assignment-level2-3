import express from "express";
import { ServicesController } from "./services.controller";
import { authenticateAdmin } from "../../middleware/auth";
import { SingleFileUpload } from "../../helpers/singleFileUpload";
// import { authenticateAdmin } from "../../middleware/authenticateAdmin";

const router = express.Router();

router.post(
  "/",
  SingleFileUpload.singleFileUpload,
  // authenticateAdmin,
  ServicesController.createServices
);

router.get("/", ServicesController.getAllServices);
router.get("/:id", ServicesController.getSingleService);
router.put("/:id", 
  // authenticateAdmin, 
  SingleFileUpload.singleFileUpload,
  ServicesController.updateServices);

router.delete("/:id",
  // authenticateAdmin, 
  ServicesController.deleteServices);

export const ServicesRoute = router;
