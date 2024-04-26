const mongoose = require('mongoose');

const listSchema = new mongoose.Schema(
    {
        item: {
            type: String,
            required: true
        },

    },
    { timestamps: true }
);

const List = mongoose.model("List", listSchema);
module.exports = List;