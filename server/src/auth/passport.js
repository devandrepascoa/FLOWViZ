const jwt = require("jsonwebtoken");

/* JWT Secret */
const secret = process.env.JWT_SECRET;

module.exports = (app, passport) => {
  // Auth
  const authUtils = require("./authUtils")();

  const authDs = require("../datasources/authDataSource")(passport, secret);
  const authService = require("../services/authService")(authDs);
  const authController = require("../controllers/authController")(
    jwt,
    authService,
    authUtils,
    secret
  );

  /* Auth Endpoints */
  // GETs
  app.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    authController.profile
  );

  // POSTs
  app.post("/register", authController.register);
  app.post("/login", authController.login);
  app.post("/logout", authController.logout);
};
