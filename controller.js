const path = require("path");

/** @type {import("express").RequestHandler} */
exports.getRoute = (req, res) => {
  res.status(200);
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
};
