const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");

const routerPlaces = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", routerPlaces);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    "mongodb+srv://dragan:Pass4Emakina@cluster0.riugc.mongodb.net/places?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });