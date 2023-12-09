import database from "mssql/msnodesqlv8";

export const sqlConfig: database.config = {
  server: "DESKTOP-E56NCP9",
  driver: "msnodesqlv8",
  database: "shop",
  user: "Misha",
  password: "qwe",
  options: {
    trustedConnection: true,
  },
};

export default database;
