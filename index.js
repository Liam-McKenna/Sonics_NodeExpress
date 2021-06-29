import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import servicesDAO from "./dao/servicesDAO.js";
import projectsDAO from "./dao/projectsDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 5000;
console.log(process.env.DATABASE_URI);

MongoClient.connect(process.env.DATABASE_URI, {
  poolSize: 50,
  wtimeout: 2500,
  useNewUrlParse: true,
})
  .catch((err) => {
    console.error("MongoClient Error: " + err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await servicesDAO.injectDB(client);
    await projectsDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  });
