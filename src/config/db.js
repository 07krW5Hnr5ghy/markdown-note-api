const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName:'markdown_note'
  })
  .then((db) => console.log(`MongoDB connected ${db.connection.host}`))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

module.exports = mongoose;
