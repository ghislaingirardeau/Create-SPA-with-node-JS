const express = require("express");
const router = express.Router();
const { getRoute } = require("./controller.js");

const middleware = (req, res, next) => {
  if (true) {
    next();
  } else {
    res.status(500).send("Something broke!");
  }
};

router.get("/*", middleware, getRoute);

module.exports = router;
