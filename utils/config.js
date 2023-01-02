const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  mongoUrl: process.env.MONGO_DB_CONN,
  secretKey: process.env.SECRET,
};
