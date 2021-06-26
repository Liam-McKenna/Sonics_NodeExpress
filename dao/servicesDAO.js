import mongodb from "mongodb";
const ObjectId = mongodb.ObjectID;

let services;

export default class ServicesDAO {
  static async injectDB(conn) {
    if (services) {
      return;
    }
    try {
      services = await conn
        .db(process.env.DATABASE_NAME)
        .collection("services");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in servicesDAO: ${e}`
      );
    }
  }
  ////
  //GET
  ////
  static async getServices({
    filters = null,
    page = 0,
    servicesPerPage = 8,
  } = {}) {
    let query;
    if (filters) {
      if ("serviceName" in filters) {
        query = { serviceName: filters["serviceName"] };
      }
    }

    let cursor;
    try {
      cursor = await services.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { servicesList: [], totalNumServices: 0 };
    }

    const displayCursor = cursor
      .limit(servicesPerPage)
      .skip(servicesPerPage * page);

    try {
      const servicesList = await displayCursor.toArray();
      const totalNumServices = await services.countDocuments(query);

      return { servicesList, totalNumServices };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { servicesList: [], totalNumServices: 0 };
    }
  }
  ////
  //POST
  ////
  static async addService(
    serviceNameArg,
    serviceTextArg,
    ServiceThumbnailArg,
    ServiceGalleryArg,
    dateArg
  ) {
    try {
      const serviceDoc = {
        serviceName: serviceNameArg,
        serviceText: serviceTextArg,
        ServiceThumbnail: ServiceThumbnailArg,
        ServiceGallery: ServiceGalleryArg,
        date: dateArg,
      };

      return await services.insertOne(serviceDoc);
    } catch (e) {
      console.error(`unable to post service: ${e}`);
    }
  }
  ////
  //PUT
  ////
  static async updateService(
    serviceId,
    serviceNameArg,
    serviceTextArg,
    ServiceThumbnailArg,
    ServiceGalleryArg,
    dateArg
  ) {
    try {
      const updateResponse = await services.updateOne(
        { _id: ObjectId(serviceId) },
        {
          $set: {
            serviceName: serviceNameArg,
            serviceText: serviceTextArg,
            ServiceThumbnail: ServiceThumbnailArg,
            ServiceGallery: ServiceGalleryArg,
            update_date: dateArg,
          },
        }
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to Update service: ${e}`);
    }
  }
  ////
  //DELETE
  ////
  static async deleteService(serviceId) {
    try {
      const deleteResponse = await services.deleteOne({
        _id: ObjectId(serviceId),
      });
      return deleteResponse;
    } catch (e) {
      console.error(`unable to Delete service: ${e}`);
    }
  }
}
