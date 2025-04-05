const express = require("express");
const ConvertedFile = require("../models/ConvertedFile");
const verifyToken = require("../middlewares/auth");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const history = await ConvertedFile.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, history });
  } catch (error) {
    console.error("Error fetching history:", error.message);
    res.status(500).json({ success: false, message: "Error fetching history" });
  }
});

module.exports = router;
