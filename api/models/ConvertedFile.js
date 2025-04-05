// models/ConvertedFile.js
const mongoose = require("mongoose");

const convertedFileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  fileName: String,
  pdfFile: String, // Path or URL to the uploaded PDF
  xmlFile: String, // Path or URL to the XML
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ConvertedFile", convertedFileSchema);
