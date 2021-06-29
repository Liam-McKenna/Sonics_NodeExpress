import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let projects;

export default class ProjectsDAO {
  static async injectDB(conn) {
    if (projects) {
      return;
    }
    try {
      projects = await conn
        .db(process.env.DATABASE_NAME)
        .collection("projects");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in projectsDAO: ${e}`
      );
    }
  }
  ////
  //GET
  ////
  static async getProjects({
    filters = null,
    page = 0,
    projectsPerPage = 8,
  } = {}) {
    let query;
    if (filters) {
      if ("name" in filters) {
        query = { name: filters["name"] };
      }
    }

    let cursor;
    try {
      cursor = await projects.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { projectsList: [], totalNumProjects: 0 };
    }

    const displayCursor = cursor
      .limit(projectsPerPage)
      .skip(projectsPerPage * page);

    try {
      const projectsList = await displayCursor.toArray();
      const totalNumProjects = await projects.countDocuments(query);

      return { projectsList, totalNumProjects };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { projectsList: [], totalNumProjects: 0 };
    }
  }
  ////
  //POST
  ////
  static async addProject(
    projectNameArg,
    projectTextArg,
    projectThumbnailArg,
    projectGalleryArg,
    projectTagsArg,
    dateArg
  ) {
    try {
      const projectDoc = {
        name: projectNameArg,
        text: projectTextArg,
        thumbnail: projectThumbnailArg,
        gallery: projectGalleryArg,
        tags: projectTagsArg,
        date: dateArg,
      };

      return await projects.insertOne(projectDoc);
    } catch (e) {
      console.error(`unable to post project: ${e}`);
    }
  }
  ////
  //PUT
  ////
  static async updateProject(
    projectId,
    projectNameArg,
    projectTextArg,
    projectThumbnailArg,
    projectGalleryArg,
    dateArg
  ) {
    try {
      const updateResponse = await projects.updateOne(
        { _id: ObjectId(projectId) },
        {
          $set: {
            projectName: projectNameArg,
            projectText: projectTextArg,
            projectThumbnail: projectThumbnailArg,
            projectGallery: projectGalleryArg,
            update_date: dateArg,
          },
        }
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to Update project: ${e}`);
    }
  }
  ////
  //DELETE
  ////
  static async deleteProject(projectId) {
    try {
      const deleteResponse = await projects.deleteOne({
        _id: ObjectId(projectId),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`unable to Delete project: ${e}`);
    }
  }
}
