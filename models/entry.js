const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    id: {type: Number, required: true},
    info: {type: String, required: true},
    date: {type: Date, required: true},
    comments: {type: [String]}
});

const Entry = mongoose.model("Entries", entrySchema);

module.exports = Entry;