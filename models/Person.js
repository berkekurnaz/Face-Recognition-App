var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var personSchema = new Schema({
    namesurname: String,
    address: String,
    username: String,
    password: String
});

module.exports = mongoose.model("person", personSchema);