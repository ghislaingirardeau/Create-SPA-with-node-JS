const path = require("path");

/** @type {import("express").RequestHandler} */
exports.getRoute = (req, res) => {
  //? SET & GET COOKIES
  /* console.log(req.cookies, req.signedCookies);
  let options1 = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true, // Indicates if the cookie should be signed
  };
  let options2 = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: false, // client side, can access cookie with document.cookie
  };
  res.cookie("cookieName", "cookieValue", options1);
  res.cookie("cookieUser", "User Gigi", options2); */
  res.status(200);
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
};
