
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var imageSchema = new Schema({
    person_id: Schema.Types.ObjectId,
    imageTitle: String,
    imageUrl: String
});

module.exports = mongoose.model("image", imageSchema);