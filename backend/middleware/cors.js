const cors = require("cors");

const corsOptions = {
  origin: process.env.CORS_ALLOWED,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

module.exports = cors(corsOptions);
