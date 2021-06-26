import express from "express";
import ServicesCtrl from "./services.controller.js";

const router = express.Router();

//Services Routes
router
  .route("/")
  .get(ServicesCtrl.apiGetServices)
  .post(ServicesCtrl.apiPostServices)
  .put(ServicesCtrl.apiPutServices)
  .delete(ServicesCtrl.apiDeleteServices);

// TO DO Projects Router

export default router;
