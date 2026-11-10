const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL;

if (databaseUrl) {
  let parsedUrl;
  try {
    parsedUrl = new URL(databaseUrl);
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL");
  }

  if (
    !["postgres:", "postgresql:"].includes(parsedUrl.protocol) ||
    !parsedUrl.hostname ||
    !parsedUrl.pathname ||
    parsedUrl.pathname === "/"
  ) {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL");
  }
}

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: "database.sqlite",
      logging: false,
    });

module.exports = sequelize;
