import ProjectsDAO from "../dao/projectsDAO.js";

export default class ProjectsController {
  ////
  //GET -> projectsDAO getProjects
  ////
  static async apiGetProjects(req, res, next) {
    const projectsPerPage = req.query.projectsPerPage
      ? parseInt(req.query.projectsPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    let filters = {};
    if (req.query.name) {
      filters.name = req.query.name;
    }
    const { projectsList, totalNumProjects } = await ProjectsDAO.getProjects({
      filters,
      page,
      projectsPerPage,
    });
    let response = {
      projects: projectsList,
      page: page,
      filters: filters,
      entries_per_page: projectsPerPage,
      total_results: totalNumProjects,
    };
    res.json(response);
  }
  ////
  //POST -> projectsDAO addProject
  ////
  static async apiPostProjects(req, res, next) {
    try {
      const date = new Date();
      await ProjectsDAO.addProject(
        req.body.name,
        req.body.text,
        req.body.thumbnail,
        req.body.gallery,
        req.body.tags,
        date
      );
      res.json({ status: "Success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  ////
  //PUT -> projectsDAO updateProject
  ////
  static async apiPutProjects(req, res, next) {
    try {
      const date = new Date();
      await ProjectsDAO.updateProject(
        req.body.name,
        req.body.text,
        req.body.thumbnail,
        req.body.gallery,
        req.body.tags,
        date
      );
      res.json({ status: "Success: " });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  ////
  //DELETE -> projectsDAO deleteProject
  ////
  static async apiDeleteProjects(req, res, next) {
    try {
      const projectId = req.body.project_id;
      await ProjectsDAO.deleteProject(projectId);
      res.json({ status: "Success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
