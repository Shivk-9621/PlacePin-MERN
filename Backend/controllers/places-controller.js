const HttpError = require("../models/http-error");
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');
const mongoose  = require("mongoose");

let DUMMY_PLACES = [
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

const getPlaceByID = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find a place.', 500);
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find a place for the provided id.', 404);
        return next(error)
    }

    res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let places;
    try {
        places = await Place.find({ creator: userId })
    } catch (err) {
        const error = new HttpError('Fetching placs failed, please try again later.', 500);
        return next(error);

    }

    if (!places || places.length === 0) {
        return next(
            new HttpError("Could not find places for the provided user id.", 404)
        );
    }

    res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    }
    catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fletsenhance.io%2F&psig=AOvVaw0SgHMiyyilIs0MFrWUrMVJ&ust=1737530987738000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMDz37-lhosDFQAAAAAdAAAAABAJ',
        creator
    });

    let user;
    try {
        user = await User.findById(creator);
        console.log(user,'no user')
    } catch (err) {
        const error = new HttpError('Creating place failed, please try again.', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        console.log('got here at 1')
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        console.log('got here at 2')
        user.places.push(createdPlace);
        console.log('got here at 3')
        await user.save({ session: sess });
        console.log('got here at 4')
        await sess.commitTransaction(); // at this point the data get really saved if anything goes wrong then it will automatically roll back
        
    } catch (err) {
        const error = new HttpError('Creating place failed, please try again.', 500);
        return next(error);
    }

    res.status(201).json({ place: createdPlace })
};

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (err) {
        const error = new HttpError('Something went worng, could not update place.', 500);
        return next(error);
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();

    } catch (err) {
        const error = new HttpError('Something went worng, could not update place.', 500);
        return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) })

};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId)
    } catch (err) {
        const error = new HttpError('Something went wrong, could nbot delete place 1.', 500);
        return next(error);
    }

    console.log(place, 'this is place')
    try {
        await place.deleteOne();
    } catch (err) {
        const error = new HttpError('Something went wrong, could nbot delete place2.', 500);
        return next(error);
    }

    res.status(200).json({ message: 'Deleted place.' })
};

exports.getPlaceByID = getPlaceByID;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
