const { db } = require("./db");
const chalk = require("chalk");
const app = require("./app");
const port = process.env.PORT || 3000;

db.sync();
console.log(chalk.green("db synced"));
app.listen(port, () => console.log(`listening on port ${port}`));
