const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    info: {type: String, required: true},
    date: {type: Date, required: true},
    comments: {type: [String]}
});

const Entry = mongoose.model("Entries", entrySchema);

module.exports = Entry;