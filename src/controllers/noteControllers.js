const Note = require("../models/Note");
const marked = require("marked");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 }); // Cache results for 5 minutes
const {fetchWithRetry} = require("../utils/util");

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

// Check grammar of a note
exports.checkGrammar = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Note not found" });

        const cacheKey = `grammar-${note._id}`;
        const cachedResult = cache.get(cacheKey);

        if (cachedResult) {
            return res.json({ cached: true, ...cachedResult });
        }
  
        const data = await fetchWithRetry("https://api.languagetool.org/v2/check", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              text: note.content,
              language: "en-US",
            }),
        });

        cache.set(cacheKey, data);
        res.json({ cached: false, ...data });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};