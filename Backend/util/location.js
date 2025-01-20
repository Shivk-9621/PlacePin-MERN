const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = "AIzaSyCNSwQv26TsAXjuQ__4MMTfBtr0ydq6P2g";

const getCoordsForAddress = async (address) => {
    console.log('this  got hit')
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const Coordinates = data.results[0].geometry.location;

  return Coordinates
};

module.exports = getCoordsForAddress;