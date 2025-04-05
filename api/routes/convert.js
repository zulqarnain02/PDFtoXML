const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https");
const ConvertedFile = require("../models/ConvertedFile");
const verifyToken = require("../middlewares/auth"); // ✅ Import middleware
// const { configDotenv } = require("dotenv");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
// require('dotenv').config(); 

const PDF_CO_API_KEY = process.env.PDF_TO_XML_KEY;


// ✅ Add verifyToken middleware here
router.post("/",verifyToken, upload.single("pdf"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const pdfPath = req.file.path;
  const fileName = path.parse(req.file.originalname).name;
  const xmlFileName = `${fileName}.xml`;

  try {
    // Step 1: Get Presigned URL
    const presignedRes = await axios.get(
      `https://api.pdf.co/v1/file/upload/get-presigned-url?contenttype=application/octet-stream&name=${req.file.originalname}`,
      { headers: { "x-api-key": PDF_CO_API_KEY } }
    );

    if (presignedRes.data.error) throw new Error(presignedRes.data.message);
    const { presignedUrl, url: uploadedFileUrl } = presignedRes.data;

    // Step 2: Upload PDF
    const fileData = fs.readFileSync(pdfPath);
    await axios.put(presignedUrl, fileData, {
      headers: { "Content-Type": "application/octet-stream" },
    });

    // Step 3: Convert PDF to XML
    const convertRes = await axios.post(
      "https://api.pdf.co/v1/pdf/convert/to/xml",
      { name: xmlFileName, url: uploadedFileUrl },
      {
        headers: {
          "x-api-key": PDF_CO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (convertRes.data.error) throw new Error(convertRes.data.message);

    // Step 4: Download Converted XML Content
    const xmlContent = await new Promise((resolve, reject) => {
      https.get(convertRes.data.url, (xmlRes) => {
        let data = "";
        xmlRes.on("data", (chunk) => (data += chunk));
        xmlRes.on("end", () => resolve(data));
        xmlRes.on("error", (err) => reject(err));
      });
    });

    // ✅ Save data to MongoDB using req.user.id
    await ConvertedFile.create({
      userId: req.user.id, // ← Now it's dynamic!
      fileName: req.file.originalname,
      pdfFile: uploadedFileUrl,
      xmlFile: convertRes.data.url,
    });

    res.json({ xmlFileName, xmlContent });

    fs.unlinkSync(pdfPath); // cleanup
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: error.message || "Conversion failed" });

    if (fs.existsSync(pdfPath)) fs.unlinkSync(pdfPath); // cleanup on error
  }
});




module.exports = router;
