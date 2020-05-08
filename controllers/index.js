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
    res.render('index/liverecognition');
}

exports.getImageRecognitionPage = (req, res, next) => {
    res.render('index/imagerecognition');
}