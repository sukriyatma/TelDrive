import Elysia from "elysia";
import fileController from "./controller/FileController";

const App: Elysia = new Elysia()
    .use(fileController)
    .listen(3000);

console.log(
  `Server is running at ${App.server?.hostname}:${App.server?.port}`
);
