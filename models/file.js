const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new mongoose.Schema({
    originalName: String,
    mimeType: String,
    size: Number,
    data: Buffer,
    uploadedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("File", fileSchema);

