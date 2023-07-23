const express = require("express");

const users = require("../routes/users");
const auth = require("../routes/auth");
const patients = require("../routes/patients");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/patients", patients);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
