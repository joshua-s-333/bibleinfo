const mongoose = require ( "mongoose")
const bible = mongoose.Schema({
    book_no : Number,
    book_name : String,
    aurthor : String,
    themes : String,
    ministry : String,
});

module.exports = mongoose.model("bible", bible, "bible")