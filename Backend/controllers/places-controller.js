const HttpError = require("../models/http-error");
const uuid = require('uuid/v4')

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world",
        imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
        address: "20 W 34th St, New York, NY 10118, United States",
        location: {
            lat: 40.748817,
            lng: -73.985428
        },
        creator: "u1"
    }
];

const getPlaceByID = (req, res, next) => {
    // get place by  ID
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    if (!place) {
        throw new HttpError("Could not find a place for the provided id.", 404);
    }

    res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
    // get place by user ID
    const userId = req.params.uid;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });

    if (!place) {
        return next(
            new HttpError("Could not find a place for the provided user id.", 404)
        );
    }

    res.json({ place });
};

const createPlace = (req, res, next) => {
    const { title, description, coordinates, address, creator } = req.body;

    const createdPlace = {
        id:uuid(),
        title,
        description,
        location: coordinates,
        address,
        creator
    };

    DUMMY_PLACES.push(createdPlace); //unshift(createdPlace) to add at the begining

    res.status(201).json({ place: createdPlace })
};

exports.getPlaceByID = getPlaceByID;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
