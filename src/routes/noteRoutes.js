const express = require("express");
const { uploadNote, getNotes, getNote, getNoteHTML } = require("../controllers/noteControllers");
const multer = require("multer");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Routes
router.post("/upload", upload.single("file"), uploadNote);
router.get("/", getNotes);
router.get("/:id", getNote);
router.get("/:id/html", getNoteHTML);

module.exports = router;
