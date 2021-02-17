const HttpError = require("../models/http-error");
const uuid = require("uuid");
const { validationResult } = require("express-validator");

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

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    return next(new HttpError("Could not find a place for provided id.", 404));
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((u) => {
    return u.creator === userId;
  });

  if (!places || places.length === 0) {
    throw new HttpError("Could not find places for provided user id.", 404);
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Some of input data are not valid", 422);
  }
  const { title, description, coordinates, address, creator } = req.body;
  const createPlace = {
    id: uuid.v4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createPlace);

  res.status(201).json({ place: createPlace });
};

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Some of input data are not valid", 422);
  }
  const { title, description } = req.body;
  const placeId = req.param.pid;
  const updatePlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatePlace.title = title;
  updatePlace.description = description;
  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json(updatePlace);
};

const deletePlaceById = (req, res, next) => {
  const placeId = req.param.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;
