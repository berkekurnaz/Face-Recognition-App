
var Person = require("../models/Person");
var Image = require("../models/Image");

/* These are pages controller */
exports.getPersonList = (req, res, next) => {

    Person.find().then((persons) => {
        res.render('person/list', { persons });
    }).catch((err) => {
        res.status(404).json(err);
    });

}

exports.addPersonPage = (req, res, next) => {
    res.render('person/add');
}

exports.updatePersonPage = (req, res, next) => {

    var id = req.params.id;

    Person.findById(id).then((person) => {
        res.render('person/update', { person });
    }).catch((err) => {
        res.status(404).json(err);
    });

}

/* These are operations controller */
exports.addPersonOperation = (req, res, next) => {

    new Person({
        namesurname: req.body.namesurname,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password
    }).save().then(() => {
        res.redirect("/person/");
    }).catch((err) => {
        res.json(err);
    })

}

exports.updatePersonOperation = (req, res, next) => {

    var id = req.body._id;

    const person = {
        namesurname: req.body.namesurname,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password
    }

    Person.update({ _id: id }, {
        $set: person
    }).then(() => {
        res.redirect("/person/");
    }).catch((err) => {
        res.status(500).json(err);
    });

}

exports.deletePersonOperation = (req, res, next) => {

    var id = req.body._id;

    Person.findByIdAndRemove(id).then((person) => {
        res.redirect("/person/");
    }).catch((err) => {
        res.json(err);
    });

}



// These are person images controller
exports.getAllImagesByPerson = (req, res, next) => {

    var personId = req.params.personId;

    Image.find({ person_id: personId }).then((images) => {
        Person.findById(personId).then((person) => {
            res.render('person/images', { images: images, person: person });
        });
    }).catch((err) => {
        res.status(404).json(err);
    });

}

exports.addImagePage = (req, res, next) => {

    var personId = req.params.personId;

    res.render('person/imageadd', { personId });

}

exports.deleteImage = (req, res, next) => {

    var imageId = req.params.id;
    var personId = req.params.personId;

    Image.findById(imageId).then((image) => {

        const fs = require('fs');
        const path = 'public/imagedatabase/' + personId + "/" + image.imageUrl;

        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

        Image.findByIdAndRemove(imageId).then((image) => {
            res.redirect("/person/images/" + personId);
        }).catch((err) => {
            res.json(err);
        });

    }).catch((err) => {
        res.status(404).json(err);
    });

}

exports.addImageOperations = (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }


    Person.findById(req.body.person_id).then((person) => {


        var fs = require('fs');
        var dir = 'public/imagedatabase/' + person._id;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        let image = req.files.image;

        var imgName = Date.now() + image.name;

        let uploadPath = 'public/imagedatabase/' + person._id + "/" + imgName;

        image.mv(uploadPath, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        });

        new Image({
            person_id: req.body.person_id,
            imageTitle: req.body.title,
            imageUrl: imgName
        }).save().then(() => {
            res.redirect("/person/images/" + req.body.person_id);
        }).catch((err) => {
            res.json(err);
        })

    });


}