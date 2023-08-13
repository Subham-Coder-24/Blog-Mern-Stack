const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const BlogModel = mongoose.model("Blogs", blogSchema);

module.exports = BlogModel;