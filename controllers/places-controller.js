const HttpError = require("../models/http-error");
const uuid = require("uuid");
const { validationResult } = require("express-validator");
const Place = require("../models/place");
const urlencoded = require("body-parser/lib/types/urlencoded");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not finda a place", 500)
    );
  }

  if (!place) {
    return next(new HttpError("Could not find a place for provided id.", 404));
  }

  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(
      new HttpError("Could not find a place for provided user id.", 500)
    );
  }

  if (!places || places.length === 0) {
    throw new HttpError("Could not find places for provided user id.", 404);
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Some of input data are not valid", 422);
  }
  const { title, description, coordinates, address, creator } = req.body;

  const createPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://static.wikia.nocookie.net/superheroes/images/f/f9/Superhero.jpg/revision/latest/scale-to-width-down/340?cb=20160706065203.jpg",
    creator,
  });
  try {
    createPlace.save();
  } catch (error) {
    return next(new HttpError("Creating place failed", 500));
  }

  res.status(201).json({ place: createPlace });
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Some of input data are not valid", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;
  console.log(placeId);

  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not update a place", 500)
    );
  }
  place.title = title;
  place.description = description;
  try {
    await place.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not update a place", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlaceById = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete place", 500)
    );
  }

  try {
    await place.remove();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete place", 500)
    );
  }
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
