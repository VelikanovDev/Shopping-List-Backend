const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("Item", ItemSchema);
