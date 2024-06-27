import express from "express";

import "express-async-errors";
import Blog from "../models/blog.js";
import User from "../models/user.js";

const blogsRouter = express.Router();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!("url" in request.body) || !("title" in request.body)) {
    return response.status(400).end();
  }

  if (!request.user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(request.user._id);
  const blog = new Blog({ ...request.body, user: user._id });
  blog.likes = blog.likes || 0;
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

// delete a blog
blogsRouter.delete("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blogToDelete = await Blog.findById(request.params.id);
  if (request.user._id.toString() !== blogToDelete.user._id.toString()) {
    return response.status(401).json({ error: "user is not the creater." });
  }

  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  if (!deletedBlog) {
    return response.status(404).end();
  }
  response.status(204).end();
});

export { blogsRouter };
