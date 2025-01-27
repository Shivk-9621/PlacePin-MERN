const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
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
  res.json({ message: error.message || "an unknown error occurred!" });
});

mongoose
  .connect('mongodb+srv://RefresherSiva:RefresherSiva%409621@cluster0.si423.mongodb.net/places?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    app.listen(5001);
    console.log('Database connected')
  })
  .catch((error) => {
    console.log(error);
  });
