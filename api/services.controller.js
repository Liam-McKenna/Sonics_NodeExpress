import ServicesDAO from "../dao/servicesDAO.js";

export default class ServicesController {
  ////
  //GET -> servicesDAO getServices
  ////
  static async apiGetServices(req, res, next) {
    const servicesPerPage = req.query.servicesPerPage
      ? parseInt(req.query.servicesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }
    const { servicesList, totalNumServices } = await ServicesDAO.getServices({
      filters,
      page,
      servicesPerPage,
    });
    let response = {
      services: servicesList,
      page: page,
      filters: filters,
      entries_per_page: servicesPerPage,
      total_results: totalNumServices,
    };
    res.json(response);
  }
  ////
  //POST -> servicesDAO addService
  ////
  static async apiPostServices(req, res, next) {
    try {
      const date = new Date();
      const Service = await ServicesDAO.addService(
        req.body.name,
        req.body.text,
        req.body.thumbnail,
        req.body.gallery,
        date
      );
      res.json({ status: "Success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  ////
  //PUT -> servicesDAO updateService
  ////
  static async apiPutServices(req, res, next) {
    try {
      const date = new Date();
      const Service = await ServicesDAO.updateService(
        req.body.service_id,
        req.body.name,
        req.body.text,
        req.body.thumbnail,
        req.body.gallery,
        date
      );
      res.json({ status: "Success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  ////
  //DELETE -> servicesDAO deleteService
  ////
  static async apiDeleteServices(req, res, next) {
    try {
      const Service = await ServicesDAO.deleteService(req.body.service_id);
      res.json({ status: "Success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
