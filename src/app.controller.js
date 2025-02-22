import chalk from "chalk";
import connect2db from "./db/connection.js";
import { createHandler } from "graphql-http/lib/use/express";
import { globalErrorHandling } from "./utils/response/error.response.js";
import { schema } from "./modules/app.graph.js";

export const bootstrap = async (app, express) => {
  const PORT = process.env.PORT;

  app.use(express.json());

  app.use("/graphql", createHandler({ schema }));
  app.get("/", (req, res, next) => {
    successResponse({
      res,
      status: 200,
      message: "Welcome to library-ms",
    });
  });

  app.use(globalErrorHandling);

  await connect2db();

  app.listen(PORT, () => {
    console.log(chalk.bgBlue(`Server is running on port ${PORT}`));
  });
};
