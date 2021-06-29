import express from "express";
import ServicesCtrl from "./services.controller.js";
import ProjectsCtrl from "./projects.controller.js";

const router = express.Router();

//Services Routes
router
  .route("/services")
  .get(ServicesCtrl.apiGetServices)
  .post(ServicesCtrl.apiPostServices)
  .put(ServicesCtrl.apiPutServices)
  .delete(ServicesCtrl.apiDeleteServices);

//Projects Routes
router
  .route("/projects")
  .get(ProjectsCtrl.apiGetProjects)
  .post(ProjectsCtrl.apiPostProjects)
  .put(ProjectsCtrl.apiPutProjects)
  .delete(ProjectsCtrl.apiDeleteProjects);

export default router;
