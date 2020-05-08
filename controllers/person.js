
var Person = require("../models/Person");

/* These are pages controller */
exports.getPersonList = (req, res, next) => {

    Person.find().then((persons) => {
        res.render('person/list', {persons});
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
        res.render('person/update', {person});
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

    const person ={
        namesurname: req.body.namesurname,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password
    }

    Person.update({_id:id},{
        $set: person
    }).then(()=>{
        res.redirect("/person/");
    }).catch((err)=>{
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