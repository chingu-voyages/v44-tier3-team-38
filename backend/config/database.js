const {
  db: { username, password, database, host },
} = require("./index");

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: "sequelize",
    logging: false, // preventing sequelize to output sql to console
  },
};
