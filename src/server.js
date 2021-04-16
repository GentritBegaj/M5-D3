import express from "express";
import listEndpoints from "express-list-endpoints";
import studentsRoutes from "./students/index.js";
import projectsRoutes from "./projects/index.js";
import cors from "cors";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { errorHandler, routeNotFoundHandler } from "./errorHandling.js";

const server = express();
const port = process.env.PORT;

const publicFolderDirectory = join(
  dirname(fileURLToPath(import.meta.url)),
  "../public"
);

server.use(express.static(publicFolderDirectory));
server.use(cors());
server.use(express.json()); // we need to specify this line of code otherwise all the req bodies will be undefined. This line MUST come BEFORE the routes
server.use("/students", studentsRoutes);
server.use("/projects", projectsRoutes);
server.use(errorHandler);
server.use(routeNotFoundHandler);

console.log(listEndpoints(server));
server.listen(port, () => {
  console.log("Server is running on port ", port);
});

server.on("error", (error) =>
  console.log("Server is not running due to ", error)
);
