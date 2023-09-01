const express = require("express");
const path = require("path");
const app = express();
const routeDynamic = require("./router");
const port = 3000;
const cookieParser = require("cookie-parser");

// TO GET AUTO COMPLETION FOR EXPRESS
/** @type {import("express").RequestHandler} */

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  /* 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  ); */
  next();
});

//? POUR LIRE LES FICHIERS COTE CLIENT
//* use route "/static" pour lire les fichiers dans static
app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.use(cookieParser("MY SECRET"));

app.use("", routeDynamic);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
