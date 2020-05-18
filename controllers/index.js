var Person = require("../models/Person");

exports.getIndexPage = (req, res, next) => {
    res.render('index/index');
}

exports.getSettingsPage = (req, res, next) => {
    res.render('index/settings');
}

exports.getHowToUsePage = (req, res, next) => {
    res.render('index/howtouse');
}

/* Recognition Pages */
exports.getLiveRecognitionPage = (req, res, next) => {

    const promise = Person.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'images',
                localField: '_id',
                foreignField: 'person_id',
                as: 'images'
            }
        },
    ])
    promise.then((data) => {
        console.log(data);
        data = JSON.stringify(data);
        res.render('index/liverecognition', { layout: false, personList: data });
    }).catch((err) => {
        res.json(err);
    });

}

exports.getImageRecognitionPage = (req, res, next) => {

    const promise = Person.aggregate([
        {
            $match: {}
        },
        {
            $lookup: {
                from: 'images',
                localField: '_id',
                foreignField: 'person_id',
                as: 'images'
            }
        },
    ])
    promise.then((data) => {
        console.log(data);
        data = JSON.stringify(data);
        res.render('index/imagerecognition', { layout: false, personList: data });
    }).catch((err) => {
        res.json(err);
    });

}