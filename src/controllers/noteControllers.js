const Note = require("../models/Note");
const marked = require("marked");

// Upload a new note
exports.uploadNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const htmlContent = marked.parse(content);

    const note = new Note({ title, content, htmlContent });
    await note.save();

    res.status(201).json({ message: "Note saved successfully", note });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get note as HTML
exports.getNoteHTML = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.send(note.htmlContent);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
