import chalk from "chalk";
import connect2db from "./db/connection.js";

export const bootstrap = async (app, express) => {
  const PORT = process.env.PORT;

  app.use(express.json());

  await connect2db();

  app.listen(PORT, () => {
    console.log(chalk.bgBlue(`Server is running on port ${PORT}`));
  });
};
